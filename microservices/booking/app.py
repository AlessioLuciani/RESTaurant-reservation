
# BOOKING microservice

from flask import Flask, jsonify
from flask_restful import Resource, Api, reqparse, abort
import json
import pymongo
import requests
from flask_cors import CORS, cross_origin
from bson.objectid import ObjectId

client = pymongo.MongoClient("mongodb://booking_db", 27017)
db = client.restaurants

app = Flask(__name__)
cors = CORS(app)
api = Api(app)


# Request Parser declaration

post_arguments = ["rest_email", "date", "service", "time", "seats", "notes", "email", "status", "authToken"]
task_post_args = reqparse.RequestParser()
for el in post_arguments:
    task_post_args.add_argument(
    el, type=str, help=f"Field {el} is required", required=True
)

update_arguments = ["res_id","status","authToken","email"]
task_update_args = reqparse.RequestParser()
for el in update_arguments:
    task_update_args.add_argument(
    el, type=str, help=f"Field {el} is required", required=True
)

get_arguments = ["authToken","email","user_type"]
task_get_args = reqparse.RequestParser()
for el in get_arguments:
    task_get_args.add_argument(
    el, type=str, help=f"Field {el} is required", required=True
)



class reserve(Resource):

    # reserve table status pending -> before check auth token
    def post(self):
        args = task_post_args.parse_args()
        user_session = {"token": args["authToken"], "email": args["email"]}

        # check user session token
        is_valid = requests.post("http://user_auth_api:3000/validate",json = user_session).json()
        if "error" in is_valid.keys():
            return "User not authorized"
        
        # inserting pening request
        args.pop('authToken')
        reservation_id = db.data.insert_one(args).inserted_id
        result = {
            "body": "Reservation pending",
            "reservation_id": str(reservation_id),
        }

        return result 


class acceptDeny(Resource):

    # change status of a given reservation 
    def patch(self):

        # check restaurant session token
        args = task_update_args.parse_args()
        restaurant_session = {"token": args["authToken"], "email": args["email"]}
        is_valid = requests.post("http://restaurant_auth_api:3000/validate",json = restaurant_session).json()
        if "error" in is_valid.keys():
            return "Restaurant not authorized"

        # basic check of status integrity
        if args["status"] not in ["pending","refused","accepted"]:
            return "Status string not correct!"

        # modify the status on mongodb sending query respect both reservation_id and rest_email
        # (a restaurant can only modify the status of its reservation requests.)
        filter = { '_id': ObjectId(args["res_id"]), 'rest_email': args["email"]}
        newvalues = { "$set": { 'status': args["status"] } }
        db.data.update_one(filter, newvalues)

        result = {"res":"Status updated"}
        return result 
    


class myReservations(Resource):

    # get a full list of a user reservations -> before check auth token
    def post(self):

        args = task_get_args.parse_args()
        user_session = {"token": args["authToken"], "email": args["email"]}

        # check user/restaurant session token
        if args["user_type"] == '0':
            is_valid = requests.post("http://user_auth_api:3000/validate",json = user_session).json()
            if "error" in is_valid.keys():
                return "User not authorized"
            myquery = { "email": args["email"]}
        
        else:
            is_valid = requests.post("http://restaurant_auth_api:3000/validate", json= user_session).json()
            if "error" in is_valid.keys():
                return "Restaurant not authorized"
            myquery = { "rest_email": args["email"]}

        # retrieve reservations
        res = list(db.data.find(myquery))
        for row in res:
            row["id"]=str(row["_id"])
            del row["_id"]

        return res



# Utilities 

class connectionCheck(Resource):
    def get(self):
        return "Connection established [BOOKING]"

class dbCheck(Resource):
    def get(self):
       return f"Avalibale databases are {list(client.list_database_names())}"



# Path declaration + app launch

api.add_resource(connectionCheck, "/ping")
api.add_resource(dbCheck, "/pingdb")
api.add_resource(reserve, "/reserve")
api.add_resource(myReservations, "/my_reservations")
api.add_resource(acceptDeny, "/change_status")

if __name__ == "__main__":
    app.run(debug=False, port=3000, host='0.0.0.0') 
