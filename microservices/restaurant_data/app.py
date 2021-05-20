from flask import Flask, jsonify
from flask_restful import Resource, Api, reqparse, abort
from flask_cors import CORS
import pymongo
from bson.objectid import ObjectId
import json
import re

client = pymongo.MongoClient("mongodb://restaurant_data_db", 27017)
db = client.restaurants

app = Flask(__name__)
cors = CORS(app)
api = Api(app)

task_post_args = reqparse.RequestParser()
task_post_args.add_argument(
    "query", type=str, help="Restaurant search query is required", required=False
)
task_post_args.add_argument(
    "id", type=str, help="Restaurant search id is required", required=False
)

class Restaurant(Resource):
    def post(self):
        args = task_post_args.parse_args()

        if args['query'] is None:
            return "Input must be {'query': '<your keyword>'}"
        if len(args['query']) == 0:
            return "search query can't be empty"

        query = args["query"].lower()
        result = db.data.find({"search_string": {"$regex": query}})
        result_list = list(result)
        for el in result_list:
            el["_id"] = str(el["_id"])
            el.pop("search_string")
        return result_list

    def get(self):

        args = task_post_args.parse_args()
        if len(args["id"]) == 0:
            return "search id is required"
        id_ = args["id"]
        
        result = db.data.find({"_id": ObjectId(id_)})
        result_list = list(result)
        for el in result_list:
            el["_id"] = str(el["_id"])
            el.pop("search_string")
        return result_list

class testSearch(Resource):
    def post(self):

        # create test db and populate it 
        dblist = client.list_database_names()       
        if not "testdb" in dblist:
            test_data = []
            testdb = client["testdb"]
            testcol = testdb["testcol"]
            # load test data
            with open("test_data.json", "r") as f:
                test_data_dict = json.load(f)
            # transform to list
            for el in test_data_dict.values():
                test_data.append(el)
            # insert test data
            _ = testcol.insert_many(test_data)
        else: 
            testdb = client.testdb

        # parse input
        args = task_post_args.parse_args()
        if args['query'] is None:
            return "Input must be {'query': '<your keyword>'}"
        if len(args['query']) == 0:
            return "search query can't be empty"
        query = args["query"].lower()

        # query db
        result = testdb.testcol.find({"search_string": {"$regex": query}})
        result_list = list(result)
        for el in result_list:
            el["_id"] = str(el["_id"])
            el.pop("search_string")
        return result_list
    
    def get(self):
        testdb = client.testdb
        args = task_post_args.parse_args()
        if len(args["id"]) == 0:
            return "search id is required"
        id_ = args["id"]
        
        result = testdb.testcol.find({"_id": ObjectId(id_)})
        result_list = list(result)
        for el in result_list:
            el["_id"] = str(el["_id"])
            el.pop("search_string")
        return result_list

class connectionCheck(Resource):
    def get(self):
        return "Connection established"


class dbCheck(Resource):
    def get(self):
        return f"Avalibale databases are {list(client.list_database_names())}"


api.add_resource(connectionCheck, "/ping")
api.add_resource(dbCheck, "/pingdb")
api.add_resource(Restaurant, "/search")
api.add_resource(testSearch, "/test")

if __name__ == "__main__":
    app.run(debug=False, port=3000, host='0.0.0.0') 
