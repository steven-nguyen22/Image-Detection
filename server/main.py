from flask import Flask, jsonify, request, send_file, send_from_directory
from pymongo import MongoClient
import os
from dotenv import load_dotenv, find_dotenv
from flask_cors import CORS, cross_origin
from ultralytics import YOLO
import numpy as np
from utils import read_video, save_video
from trackers import Tracker
from team_assigner import TeamAssigner
from player_ball_assigner import PlayerBallAssigner
from camera_movement_estimator import CameraMovementEstimator
from view_transformer import ViewTransformer
from speed_and_distance_estimator import SpeedAndDistance_Estimator

from werkzeug.utils import secure_filename

app = Flask(__name__)
cors = CORS(app, origins='*')
# CORS(app)

app.config['UPLOAD_FOLDER'] = 'upload_files'
app.config['OUTPUT_FOLDER'] = 'output_videos'

load_dotenv(find_dotenv())
connection_string = os.environ.get("MONGO_URL")
client = MongoClient(connection_string)

# dbs = client.list_database_names()
# print(dbs)
db = client.Sports_Videos
collections = db.list_collection_names()
print(collections)


@app.route('/fileupload', methods=['POST'])
def insert_doc():
    # Getting and saving video file locally
    file = request.files.get('file', '')
    file.save(os.path.join(os.path.abspath(os.path.dirname(__file__)),app.config['UPLOAD_FOLDER'],secure_filename(file.filename)))
    fileName = file.filename
    
    # Saving file to MONGODB
    # collection = db.Image_Tracking
    # test_doc = {
    #     "file": video
    # }
    # inserted_id = collection.insert_one(test_doc).inserted_id
    # print(inserted_id)

    # Read Video
    video_frames = read_video(f'server/upload_files/{fileName}')

    # Initialize Tracker
    tracker = Tracker('server/models/basketballbest.pt')

    # tracks = tracker.get_object_tracks(video_frames,
    #                                    read_from_stub=True,
    #                                    stub_path='server/stubs/track_stubs.pkl')

    tracks = tracker.get_object_tracks(video_frames)
    
    # Get object positions 
    tracker.add_position_to_tracks(tracks)
    
    # camera movement estimator
    camera_movement_estimator = CameraMovementEstimator(video_frames[0])
    # camera_movement_per_frame = camera_movement_estimator.get_camera_movement(video_frames,
    #                                                                             read_from_stub=True,
    #                                                                             stub_path='server/stubs/camera_movement_stub.pkl')

    camera_movement_per_frame = camera_movement_estimator.get_camera_movement(video_frames)
    camera_movement_estimator.add_adjust_positions_to_tracks(tracks,camera_movement_per_frame)

    # View Trasnformer
    view_transformer = ViewTransformer()
    view_transformer.add_transformed_position_to_tracks(tracks)
    
    # Interpolate Ball Positions
    tracks["ball"] = tracker.interpolate_ball_positions(tracks["ball"])

    # Speed and distance estimator
    speed_and_distance_estimator = SpeedAndDistance_Estimator()
    speed_and_distance_estimator.add_speed_and_distance_to_tracks(tracks)

    # Assign Player Teams
    team_assigner = TeamAssigner()
    team_assigner.assign_team_color(video_frames[0], 
                                    tracks['players'][0])
    
    for frame_num, player_track in enumerate(tracks['players']):
        for player_id, track in player_track.items():
            team = team_assigner.get_player_team(video_frames[frame_num],   
                                                 track['bbox'],
                                                 player_id)
            tracks['players'][frame_num][player_id]['team'] = team 
            tracks['players'][frame_num][player_id]['team_color'] = team_assigner.team_colors[team]

    # Assign Ball Aquisition
    player_assigner = PlayerBallAssigner()
    team_ball_control = []
    for frame_num, player_track in enumerate(tracks['players']):
        ball_bbox = tracks['ball'][frame_num][1]['bbox']
        assigned_player = player_assigner.assign_ball_to_player(player_track, ball_bbox)

        if assigned_player != -1:
            tracks['players'][frame_num][assigned_player]['has_ball'] = True
            team_ball_control.append(tracks['players'][frame_num][assigned_player]['team'])
        else:
            if team_ball_control:
                team_ball_control.append(team_ball_control[-1])
    team_ball_control= np.array(team_ball_control)


    # Draw output
    # Draw object Tracks
    output_video_frames = tracker.draw_annotations(video_frames, tracks, team_ball_control)


    # Draw Camera movement
    output_video_frames = camera_movement_estimator.draw_camera_movement(output_video_frames,camera_movement_per_frame)

    ## Draw Speed and Distance
    speed_and_distance_estimator.draw_speed_and_distance(output_video_frames,tracks)

    # Save video
    save_video(output_video_frames, 'server/output_videos/output_video.mp4')

    return 'Video Complete'


@app.route("/api/users", methods=['GET']) 
def users():
    # return send_file('output_videos/output_video.mp4', as_attachment=False)
    return send_from_directory(app.config['OUTPUT_FOLDER'], 'output_video.mp4', as_attachment=True)
    # return jsonify({
    #     "users": [
    #         'steve',
    #         'test',
    #         'test2'
    #     ]
    # })

@app.route("/download", methods=['GET'])
def download_file():
    # file = "output_videos/output_video.mp4"
    file = "upload_files/nba_clip2.mp4"
    return send_file(file, as_attachment=True)
    # return 'yas'

@app.route("/download2", methods=['GET'])
def download_files():
    file = "output_videos/output_video.mp4"
    # file = "upload_files/nba_clip2.mp4"
    return send_file(file, as_attachment=True)
    # return 'yas'



if __name__ == "__main__":
    app.run(debug=True, port=8080)