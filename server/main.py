from flask import Flask, jsonify, request
from pymongo import MongoClient
import os
from dotenv import load_dotenv, find_dotenv
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app, origins='*')
# CORS(app)



load_dotenv(find_dotenv())
connection_string = os.environ.get("MONGO_URL")
client = MongoClient(connection_string)

# dbs = client.list_database_names()
# print(dbs)
db = client.Sports_Videos
collections = db.list_collection_names()
print(collections)


@app.route('/fileupload', methods=['POST'])
# @cross_origin(origins='*')
def insert_doc():
    video = request.json['file']
    print(video)
    # collection = db.Image_Tracking
    # test_doc = {
    #     "file": video
    # }
    # inserted_id = collection.insert_one(test_doc).inserted_id
    # print(inserted_id)

    return 'yer'

# insert_doc()

@app.route("/api/users", methods=['GET']) 
def users():
    return jsonify({
        "users": [
            'steve',
            'test',
            'test2'
        ]
    })



if __name__ == "__main__":
    app.run(debug=True, port=8080)