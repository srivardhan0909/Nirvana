from flask import Flask, jsonify, request
import pickle
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# Load preprocessed data and similarity matrix
games = pickle.load(open('src\Components\Recomendations\games.pkl', 'rb'))
similarity = pickle.load(open('src\Components\Recomendations\similarity.pkl', 'rb'))

# Function to recommend games
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

@app.route('/recommendations', methods=['POST'])
def get_recommendations():
    data = request.get_json()
    game_name = data['game_name']
    level = data['level']
    played = data['played']
    recommendations = recommend(game_name, level, played)
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
