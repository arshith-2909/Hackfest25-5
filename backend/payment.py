from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import math

app = Flask(__name__)
CORS(app)

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["pennywise"]
transactions = db["transactions"]

def calculate_spare_change(amount):
    rounded = math.ceil(amount)
    return round(rounded - amount, 2)

@app.route("/api/transaction", methods=["POST"])
def add_transaction():
    data = request.json
    amount = float(data["amount"])
    type_ = data["type"].lower()  # "booking" or "bill"

    spare = calculate_spare_change(amount) if data.get("spareEnabled", True) else 0.0

    transaction = {
        "amount": amount,
        "type": type_,
        "category": type_,
        "spare_change": spare,
        "details": data.get("details", "")
    }

    transactions.insert_one(transaction)
    return jsonify({"message": "Transaction saved", "spareChange": spare}), 200

@app.route("/api/spare-change", methods=["GET"])
def get_total_spare():
    pipeline = [
        {"$group": {"_id": None, "total": {"$sum": "$spare_change"}}}
    ]
    result = list(transactions.aggregate(pipeline))
    total = round(result[0]["total"], 2) if result else 0.0
    return jsonify({"totalSpareChange": total}), 200

if __name__ == "__main__":
    app.run(debug=True)
