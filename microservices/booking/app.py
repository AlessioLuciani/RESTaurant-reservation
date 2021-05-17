from flask import Flask, jsonify
from flask_restful import Resource, Api, reqparse, abort
import json
import pymongo
import requests

client = pymongo.MongoClient("localhost", 27017)
db = client.reservations

app = Flask(__name__)
api = Api(app)


arguments = ["restaurantName", "date", "service", "time", "seats", "notes", "email", "status", "authToken"]

task_post_args = reqparse.RequestParser()
for el in arguments:
    task_post_args.add_argument(
    el, type=str, help=f"Field {el} is required", required=True
)


class reservation(Resource):
    # reserve table status pending
    def post(self):
        args = task_post_args.parse_args()
        user_session = {"authToken": args["authToken"], "email": args["email"]}
        # TODO come capisco se è un errore?
        #is_valid = requests.get("http://user_auth_api:3000/validate", user_session)
        #if "error" in is_valid.keys():
        #    return "User not authorized"

        # TODO controllo posti disponibili
        args.pop('authToken')
        reservation_id = db.data.insert_one(args).inserted_id
        result = {
            "body": "Reservation pending",
            "reservation_id": str(inserted_id)
        }
        return result 
    def update(self):
        pass

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
api.add_resource(reservation, "/reserve")

if __name__ == "__main__":
    app.run(debug=True, port=5001)