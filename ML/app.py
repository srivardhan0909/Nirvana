from flask import Flask, jsonify, request, render_template, session, redirect, url_for
from flask_cors import CORS
import joblib
import numpy as np
import pickle
import pandas as pd
from gevent.pywsgi import WSGIServer

app = Flask(__name__, template_folder='templates')
CORS(app)

app.config['SESSION_TYPE'] = 'filesystem'
app.config['SECRET_KEY'] = 'ffc7d34aab51af9fcf5eccc2b716383c'
app.secret_key = 'ffc7d34aab51af9fcf5eccc2b716383c'
# Load machine learning model for the first application
model_aut = pickle.load(open("model_files/ml.pkl", "rb"))

# Load machine learning model for the second application
model_dislexia = pickle.load(open("model_files/model.pkl", "rb"))
sc = pickle.load(open("model_files/sc_model.pkl", "rb"))

# Load data for the third application
games = pickle.load(open("model_files/games.pkl", "rb"))
similarity = pickle.load(open("model_files/similarity.pkl", "rb"))

# Define routes for the combined application
@app.route('/apredict', methods=['POST'])
def submit_survey():
    data = request.json
    answers = data.get('answers')
    features = [np.array(answers)]
    prediction = predicter(features, model_aut)

    return jsonify({'prediction': prediction})

def predicter(features, model):
    prediction = model.predict(features)
    return prediction[0]

@app.route('/quizz', methods=["GET", "POST"])
def quizz():
    if request.method == "POST":
        final=[]
        print("quizz start ->",final)
        data = request.json
        answers = data.get('answers')
        score = answers
        print(score)
        Language_vocab = round((score[0]+score[1]+score[2]+score[3]+score[4]+score[5]+score[7])/28,1)
        Memory = round((score[1]+score[8])/8,1)
        #Speed = Calculated on the basis of time taken to complete the quiz(for now lets take some value)
        speed = 0.5
        Visual_discrimination = round((score[0]+score[2]+score[3]+score[5])/16,1)
        Audio_Discrimination = round((score[6]+score[9])/8,1)
        final = [Language_vocab,Memory,speed,Visual_discrimination,Audio_Discrimination]
        print("after quiz -> ",final)
    return jsonify({'scr': final})

@app.route('/survey', methods=["GET", "POST"])
def survey():
    if request.method == "POST":
        data = request.json
        answers = data.get('answers')
        score = answers
        f2 = data.get('vals')
        print("Survey start -> ",f2)
        print(score)
        survey_score = round((sum(score))/80,1)
        f2.append(survey_score)
        print(f2)
        print("survey score -> ",survey_score)
        session['pred']=f2
    return jsonify({'scr': f2})

@app.route('/dpredict', methods=["GET", "POST"])
def predict():
    data = request.json
    score = data.get('vals')
    print("pred start -> ",score)
    prediction = model_dislexia.predict(sc.transform([score]))
    print("prediction1 -> ",prediction[0])
    output = int(prediction[0])
    print("fprediction -> ",output)
    if output==2:
        prediction=f"Your chance of having dylexia is LOW....."
        result = "You are Good.."
    elif output==1:
        prediction=f"Your chance of having dylexia is MODERATE....."
        result="If you have any doubt consult a doctor..."
    else:
        prediction=f"Your chance of having dylexia is HIGH....."
        result="Consult a doctor..."
    
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
    app.run(host="0.0.0.0", port=8080, debug=True)
