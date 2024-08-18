from ultralytics import YOLO
from utils import read_video, save_video

# model = YOLO('yolov8x')

# results = model('server/boat.jpg', save=True)
# print(results)
# print('==================')
# for box in results[0].boxes:
#     print(box)

def main(): 
    # Read Video
    video_frames = read_video('server/upload_files/nba_clip2.mp4')

    # Save video
    save_video(video_frames, 'server/output_videos/output_video.avi')

if __name__ == '__main__':
    main()