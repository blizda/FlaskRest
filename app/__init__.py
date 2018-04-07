from flask import Flask, jsonify
from flask_pymongo import PyMongo
from config import MongoConfig, Config
from flask_cors import CORS


app = Flask(__name__)
app.config.from_object(Config)
app.config.from_object(MongoConfig)
CORS(app)
mongo = PyMongo(app, config_prefix='MONGO')

from app import routes
