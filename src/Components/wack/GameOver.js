import React, { Component } from 'react';
import axios from 'axios';

class GameOver extends Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      recommendations: [],
      error: null
    };
    // Binding the method to 'this' context
    this.getRecommendations = this.getRecommendations.bind(this);
  }

  // Method to fetch recommendations
  getRecommendations() {
    axios.post('https://final-ps-ml1.onrender.com/recommendations', {
      game_name: "Attention",
      level: "medium",
      played: [],
    })
    .then(response => {
      this.setState({ recommendations: response.data, error: null });
    })
    .catch(error => {
      console.error('Error fetching recommendations:', error);
      this.setState({ error: 'Error fetching recommendations' });
    });
  }

  render() {
    return (
      <div className="game__game-over" style={{ display: this.props.context.state.gameOver }}>
        <div>
        <button onClick={this.getRecommendations}>Get Recommendations</button>
        {this.state.error && (
          <p className="error-message">{this.state.error}</p>
        )}
        <ul>
          {this.state.recommendations.length > 0 ? (
            this.state.recommendations.map((recommendation, index) => (
              <li key={index}>{recommendation[0]} : {recommendation[1]}</li>
            ))
          ) : (
            null
          )}
        </ul>
        </div>
        <h1 className="game__game-over-header">GAME OVER!</h1>
        <p className="game__you-scored">You scored { this.props.context.state.score }</p>
            <br></br>
      </div>
    );
  }
}

export default GameOver;
