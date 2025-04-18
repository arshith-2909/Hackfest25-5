from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os

load_dotenv()

mongo = PyMongo()
MONGO_URI = os.getenv("MONGO_URI")
