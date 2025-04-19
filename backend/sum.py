from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

# MongoDB Atlas URI
MONGO_URI = "mongodb+srv://karthik12:Karthik1234@cluster0.zi1bjbr.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(MONGO_URI)

# Use your actual DB and collection
db = client["spareDB"]
collection = db["bookings"]

@app.route('/totalscore', methods=['GET'])
def get_total_score():
    email = request.args.get('email')
    if not email:
        return jsonify({"error": "Email is required"}), 400

    # Remove leading/trailing whitespace or newline characters from email
    email = email.strip()

    # Correct MongoDB aggregation query
    result = collection.aggregate([
        {"$match": {"email": email}},  # Match documents with the specific email
        {"$group": {
            "_id": "$email",  # Group by email
            "total_score": {"$sum": "$spareChange"}  # Sum the spareChange field
        }}
    ])
    
    # Retrieve the aggregation result
    result_doc = next(result, None)  # Get the first document from the aggregation result

    # Check if a result exists
    if result_doc:
        return jsonify({
            "email": email,
            "total_score": result_doc["total_score"]
        })
    
    # If no result found, return 0
    return jsonify({
        "email": email,
        "total_score": 0
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5003) 
