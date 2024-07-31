from ultralytics import YOLO

model = YOLO('yolov8x')

results = model.predict('input_videos/soccer_clip.mp4', save=True, stream=True)
print(results)
print('==================')
# for box in results[0].boxes:
#     print(box)
