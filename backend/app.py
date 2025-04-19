from flask import Flask, request, jsonify
from savings_predictor import calculate_savings, generate_report

app = Flask(__name__)

@app.route("/predict-savings", methods=["POST"])
def predict_savings():
    try:
        data = request.json
        salary = float(data["salary"])
        this_month = data["this_month"]
        last_month = data["last_month"]
        result = calculate_savings(salary, this_month, last_month)
        report = generate_report(result)
        return jsonify({"status": "success", "report": report})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
