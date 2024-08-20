from flask import Flask, jsonify, request, send_file, send_from_directory
from pymongo import MongoClient
import os
from dotenv import load_dotenv, find_dotenv
from flask_cors import CORS, cross_origin
from ultralytics import YOLO
from utils import read_video, save_video

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

    # model = YOLO('yolov8x')
    # results = model(f'server/upload_files/{fileName}', save=True)

    # collection = db.Image_Tracking
    # test_doc = {
    #     "file": video
    # }
    # inserted_id = collection.insert_one(test_doc).inserted_id
    # print(inserted_id)

    # Read Video
    video_frames = read_video(f'server/upload_files/{fileName}')

    # Save video
    save_video(video_frames, 'server/output_videos/output_video.mp4')

    vid = "upload_files/nba_clip2.mp4"

    # return send_file(vid, as_attachment=True)
    return 'yas'


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