from flask import Flask
from pymongo import MongoClient
import os
from dotenv import load_dotenv, find_dotenv
from flask_cors import CORS

load_dotenv(find_dotenv())
connection_string = os.environ.get("MONGO_URL")
client = MongoClient(connection_string)

# dbs = client.list_database_names()
# print(dbs)
db = client.Sports_Videos
collections = db.list_collection_names()
print(collections)

app = Flask(__name__)
cors = CORS(app, origins='*')

@app.route('/fileupload', methods=['POST'])
def insert_doc():
    collection = db.Image_Tracking
    test_doc = {
        "test": "file"
    }
    inserted_id = collection.insert_one(test_doc).inserted_id
    print(inserted_id)

    return 'yer'

# insert_doc()



if __name__ == "__main__":
    app.run(debug=True, port=8080)