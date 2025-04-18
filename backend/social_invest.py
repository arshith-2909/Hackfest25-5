from flask import Flask
from flask_cors import CORS
from db import mongo, MONGO_URI
from routes.circle_routes import circle_bp

app = Flask(__name__)
app.config["MONGO_URI"] = MONGO_URI
mongo.init_app(app)

# Enable CORS for all domains
CORS(app)

@app.route('/')
def home():
    return 'Hello, Flask!'

app.register_blueprint(circle_bp)

if __name__ == "__main__":
 app.run(debug=True, host='0.0.0.0', port=5001) 
