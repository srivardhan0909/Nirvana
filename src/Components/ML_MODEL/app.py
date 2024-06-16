from flask import Flask, jsonify, request, render_template, session, redirect, url_for
from flask_cors import CORS
import joblib
import numpy as np
import pickle
import pandas as pd

app = Flask(__name__, template_folder='templates')
CORS(app)

app.config['SESSION_TYPE'] = 'filesystem'
app.config['SECRET_KEY'] = 'ffc7d34aab51af9fcf5eccc2b716383c'
app.secret_key = 'ffc7d34aab51af9fcf5eccc2b716383c'
# Load machine learning model for the first application
model_ml = joblib.load('src/Components/ML_MODEL/Autisam/ml')

# Load machine learning model for the second application
model_dislexia = joblib.load("src/Components/ML_MODEL/Dyslexia/model_joblib")
sc = joblib.load("src/Components/ML_MODEL/Dyslexia/sc_model")

# Load data for the third application
games = pickle.load(open('src/Components/ML_MODEL/Recommendations/games.pkl', 'rb'))
similarity = pickle.load(open('src/Components/ML_MODEL/Recommendations/similarity.pkl', 'rb'))

# Define routes for the combined application
@app.route('/apredict', methods=['POST'])
def submit_survey():
    data = request.json
    answers = data.get('answers')
    features = [np.array(answers)]
    prediction = predicter(features, model_ml)

    return jsonify({'prediction': prediction})

def predicter(features, model):
    prediction = model.predict(features)
    return prediction[0]

@app.route('/quizz', methods=["POST"])
def quizz():
    data = request.json
    answers = data.get('answers')
    score = answers
    final = calculate_score(score)
    return jsonify({'scr': final})

def calculate_score(score):
    # Your scoring logic here
    final = [0, 0, 0, 0, 0]  # Dummy data for now
    return final

@app.route('/survey', methods=["POST"])
def survey():
    data = request.json
    answers = data.get('answers')
    score = answers
    f2 = data.get('vals')
    survey_score = round((sum(score)) / 80, 1)
    f2.append(survey_score)
    session['pred'] = f2
    return jsonify({'scr': f2})

@app.route('/dpredict', methods=["POST"])
def predict():
    data = request.json
    score = data.get('vals')
    prediction = model_dislexia.predict(sc.transform([score]))
    output = int(prediction[0])
    result = ""
    if output == 2:
        prediction = f"Your chance of having dyslexia is LOW....."
        result = "You are Good.."
    elif output == 1:
        prediction = f"Your chance of having dyslexia is MODERATE....."
        result = "If you have any doubt consult a doctor..."
    else:
        prediction = f"Your chance of having dyslexia is HIGH....."
        result = "Consult a doctor..."
    return jsonify({'prediction': prediction, 'result': result, 'output': output})

@app.route('/recommendations', methods=['POST'])
def get_recommendations():
    data = request.get_json()
    game_name = data['game_name']
    level = data['level']
    played = data['played']
    recommendations = recommend(game_name, level, played)
    return jsonify(recommendations)

def recommend(game, level, played):
    levels = {
        "hard": 2,
        "medium": 1,
        "easy": 0
    }

    game_index = games[(games['Game_name'] == game) & (games['level'] == level)].index[0]
    distances = similarity[game_index]
    games_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])
    count = 0
    played.append(game_index)
    recommendations = []

    for i in games_list:
        if games.iloc[i[0]].id not in played:
            if games.iloc[i[0]].Game_name == game:
                if games.iloc[i[0]].level != level and levels[games.iloc[i[0]].level] > levels[level]:
                    recommendations.append((games.iloc[i[0]].Game_name, games.iloc[i[0]].level))
                    count += 1
                    if count == 3:
                        break
            else:
                if levels[games.iloc[i[0]].level] >= levels[level]:
                    recommendations.append((games.iloc[i[0]].Game_name, games.iloc[i[0]].level))
                    count += 1
                    if count == 3:
                        break

    return recommendations

if __name__ == '__main__':
    app.run(debug=True, port=5001)
