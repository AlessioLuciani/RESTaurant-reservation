from flask import Flask, jsonify
from flask_restful import Resource, Api, reqparse, abort
import pymongo

client = pymongo.MongoClient("mongodb://restaurant_data", 27017)
db = client.restaurants

app = Flask(__name__)
api = Api(app)

task_post_args = reqparse.RequestParser()
task_post_args.add_argument(
    "query", type=str, help="Restaurant search query is required", required=True
)

class Restaurant(Resource):
    def post(self):
        args = task_post_args.parse_args()
        query = args["query"]
        result = db.data.find({"$text": {"$search": query}})
        result_list = list(result)
        for el in result_list:
            el["_id"] = str(el["_id"])
            el.pop("menu_list")
        return result_list



class connectionCheck(Resource):
    def get(self):
        return "Connection established"


class dbCheck(Resource):
    def get(self):
        data = db.data.find_one({"nome": "test_data"})
        data.pop("_id", None)
        return jsonify(data)


api.add_resource(connectionCheck, "/ping")
api.add_resource(dbCheck, "/pingdb")
api.add_resource(Restaurant, "/search")

if __name__ == "__main__":
    app.run(debug=False, port=3000) 
