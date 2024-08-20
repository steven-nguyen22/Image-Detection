import numpy as np 
import cv2

class ViewTransformer():
    def __init__(self):
        #court width and length per trapazoidal section in meters 
        #94ft = 29m --> 29/2/9*4 = 6.4m, divide by half then divide by 9 sections then * 4 sections
        court_width = 15
        court_length = 6.4

        #top left, bottom left, bottom right, top right
        #pixels of trapazoid corresponding to video
        self.pixel_vertices = np.array([[110, 1035], 
                               [265, 275], 
                               [1640, 260], 
                               [1640, 915]])
        
        #top right, top left, bottom left, bottom right
        self.target_vertices = np.array([
            [0,court_width],
            [0, 0],
            [court_length, 0],
            [court_length, court_width]
        ])

        self.pixel_vertices = self.pixel_vertices.astype(np.float32)
        self.target_vertices = self.target_vertices.astype(np.float32)

        self.persepctive_trasnformer = cv2.getPerspectiveTransform(self.pixel_vertices, self.target_vertices)

    def transform_point(self,point):
        p = (int(point[0]),int(point[1]))
        is_inside = cv2.pointPolygonTest(self.pixel_vertices,p,False) >= 0 
        if not is_inside:
            return None

        reshaped_point = point.reshape(-1,1,2).astype(np.float32)
        tranform_point = cv2.perspectiveTransform(reshaped_point,self.persepctive_trasnformer)
        return tranform_point.reshape(-1,2)

    def add_transformed_position_to_tracks(self,tracks):
        for object, object_tracks in tracks.items():
            for frame_num, track in enumerate(object_tracks):
                for track_id, track_info in track.items():
                    position = track_info['position_adjusted']
                    position = np.array(position)
                    position_trasnformed = self.transform_point(position)
                    if position_trasnformed is not None:
                        position_trasnformed = position_trasnformed.squeeze().tolist()
                    tracks[object][frame_num][track_id]['position_transformed'] = position_trasnformed