from flask import Flask, request, jsonify
from flask_cors import CORS
from savings_predictor import calculate_savings, generate_report

app = Flask(__name__)
CORS(app)  # allow requests from React frontend

@app.route('/predict-savings', methods=['POST'])
def predict_savings():
    try:
        data = request.json
        salary = float(data['salary'])

        this_month = {
            "Recharge": float(data['this_recharge']),
            "Food": float(data['this_food']),
            "Grocery": float(data['this_grocery']),
            "Bills": float(data['this_bills'])
        }
        last_month = {
            "Recharge": float(data['last_recharge']),
            "Food": float(data['last_food']),
            "Grocery": float(data['last_grocery']),
            "Bills": float(data['last_bills'])
        }

        results = calculate_savings(salary, this_month, last_month)
        report = generate_report(results)
        return jsonify({"report": report})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
