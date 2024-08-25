from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from textblob import TextBlob
from dataclasses import dataclass
from flask_cors import cross_origin
import os

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# MODELS


@dataclass
class SentimentActivityLog(db.Model):
    id: int = db.Column(db.Integer, primary_key=True)
    user_input: str = db.Column(db.String(), nullable=False)
    output_polarity: float = db.Column(db.Float)
    output_subjectivity: float = db.Column(db.Float)
    output_is_positive: bool = db.Column(db.Boolean)
    system_created_at: str = db.Column(
        db.DateTime, server_default=db.func.now())

    def __repr__(self):
        return f'<Activity Log>'


with app.app_context():
    db.create_all()


# ROUTES

@app.route('/analyze', methods=['POST'])
@cross_origin()
def analyze_sentiment():
    data = request.json
    user_input = data.get('user_input')

    analysis = TextBlob(user_input)
    polarity = round(analysis.sentiment.polarity, 4)
    subjectivity = round(analysis.sentiment.subjectivity, 4)
    is_positive = polarity > 0

    log = SentimentActivityLog(user_input=user_input, output_polarity=polarity,
                               output_subjectivity=subjectivity,
                               output_is_positive=is_positive)
    db.session.add(log)
    db.session.commit()

    return jsonify(log), 201


@app.route('/logs', methods=['GET'])
@cross_origin()
def get_logs():
    logs = SentimentActivityLog.query.order_by(
        SentimentActivityLog.system_created_at.desc()).all()
    return jsonify(logs), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0')
