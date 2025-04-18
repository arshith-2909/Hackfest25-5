# MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/social_invest
from flask import Blueprint, request, jsonify
from db import mongo
from models.circle_model import create_circle_data
from bson import ObjectId

circle_bp = Blueprint("circle_bp", __name__)

@circle_bp.route("/circles/create", methods=["POST"])
def create_circle():
    data = request.json
    circle = create_circle_data(
        data["name"],
        data["createdBy"],
        data["monthlyTarget"],
        data["planType"],
        data["riskLevel"]
    )
    result = mongo.db.circles.insert_one(circle)
    return jsonify({"message": "Circle created", "circleId": str(result.inserted_id)})

@circle_bp.route("/circles/<circle_id>/join", methods=["PUT"])
def join_circle(circle_id):
    user_id = request.json["userId"]
    mongo.db.circles.update_one(
        {"_id": ObjectId(circle_id)},
        {"$addToSet": {"members": user_id}}
    )
    return jsonify({"message": f"{user_id} joined the circle"})
@circle_bp.route("/circles", methods=["GET"])
def get_all_circles():
    circles = mongo.db.circles.find()
    circle_ids = [str(circle["_id"]) for circle in circles]
    return jsonify(circle_ids)

# Contribute to a circle (update the current pool and add the transaction)
@circle_bp.route("/circles/<circle_id>/contribute", methods=["POST"])
def contribute(circle_id):
    data = request.json
    user_id = data["userId"]
    contribution = {
        "userId": user_id,
        "amount": data["amount"],
       
    }

    # Update the circle's current pool and add the transaction to the list of transactions
    mongo.db.circles.update_one(
        {"_id": ObjectId(circle_id)},
        {
            "$inc": {"currentPool": data["amount"]},  # Increment the current pool by the contribution amount
            "$push": {"transactions": contribution}  # Add the contribution transaction
        }
    )
    return jsonify({"message": "Contribution added successfully"})

@circle_bp.route("/circles/<circle_id>", methods=["GET"])
def get_circle(circle_id):
    circle = mongo.db.circles.find_one({"_id": ObjectId(circle_id)})
    if not circle:
        return jsonify({"error": "Circle not found"}), 404
    circle["_id"] = str(circle["_id"])
    return jsonify(circle)
