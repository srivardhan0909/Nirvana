import React, { Component } from 'react';
import './App.css';
import anime from 'animejs';
import Score from './Score.js';
import GameOver from './GameOver.js';
import StartButton from './StartButton.js';
import MoleHole from './MoleHole.js';
import axios from 'axios';
class WackApp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      1:'translate(0, 110%)',
      2:'translate(0, 110%)',
      3:'translate(0, 110%)',
      4:'translate(0, 110%)',
      5:'translate(0, 110%)',
      6:'translate(0, 110%)',
      7:'translate(0, 110%)',
      8:'translate(0, 110%)',
      9:'translate(0, 110%)',
      shake: 'translate(0, 0)',
      gameHasStarted: false,
      moleHasBeenWhacked: false,
      score: 0,
      lastMole: '',
      display: 'none',
      buttonMessage: 'Start Game',
      gameOver: 'none',
      buttonDisplay: 'inline-block',
      titleMargin: '15px',
      difficulty: 'easy'
    };
    this.addToScore = this.addToScore.bind(this);
    this.gameOverRef = React.createRef();

  }

  animate(el){
    anime({
      targets: el,
      direction: 'alternate',
      loop: true,
      easing: 'easeInQuad',
      duration: 1600,
      scale: function(el, i, l) {
        return (l - i) + .08;
      },
    });
  }

  timeOut(num){
    if (this.state.gameHasStarted){return};
    this.setState({
      buttonDisplay: 'none',
      display: 'block',
      gameOver: 'none',
      titleMargin: 0
    });
    this.shakeScreen();
    window.setTimeout(() => {
      this.startGame();
    }, num);
  }

  startGame() {
    if (this.state.gameHasStarted) {
      return;
    }

    this.setState({
      gameHasStarted: true,
      score: 0
    });

    let x = 0;
    const intervalID = setInterval(() => {
      this.displayMoles();
      if (++x === 16) {
            try {
              const scr = axios.post('https://final-ps-backend.vercel.app/api/activity', {
                email: localStorage.getItem('email'),
                gameType: "Attention",
                score: Math.round((this.state.score/30) * 10),
              });
              console.log(scr);
            } catch (error) {
              console.error('Error submitting:', error);
            }
  
        window.clearInterval(intervalID);
        this.clearMoles();
        this.setState({ gameHasStarted: false });
        window.setTimeout(() => {
          // Adjust difficulty based on player's performance
          const newDifficulty = this.adjustDifficulty();
          this.setState({
            display: 'none',
            gameOver: 'block',
            buttonMessage: 'Play again',
            buttonDisplay: 'inline-block',
            titleMargin: '15px',
            difficulty: newDifficulty
          });
          this.animate(this.refs.gameOver);
        }, 850);
      }
    }, 2000 / this.getDifficultyMultiplier());
  }


  clearMoles(){
    for(let value in this.state){
      if (!isNaN(value)){
        this.setState({
          [value]: 'translate(0, 110%)'
        });
      }
    }
  }

  displayMoles(){
    let activeMole = Math.ceil(Math.random() * 9);
    if (this.state.lastMole[0] === activeMole){
      this.displayMoles();
      return;
    }
    this.clearMoles();
    this.setState({
      [activeMole]: 'translate(0, 15%)',
      lastMole: [activeMole]
    });
  }

  lockOutClick(){
    window.setTimeout(() => {
      this.setState({ moleHasBeenWhacked: false })
    }, 350)
  }

  addToScore(e){
    if (this.state.moleHasBeenWhacked){ return; }
    let target = e.target;
    target.parentNode.classList.add('game__cross');
    target.classList.add('no-background');
    this.lockOutClick();
    this.setState({
      background: '75px',
      moleHasBeenWhacked: true,
      score: [parseInt(this.state.score, 10) + 1]
    });
    window.setTimeout(function(){
      target.parentNode.classList.remove('game__cross');
      target.classList.remove('no-background');
    }, 500)
  }

  shakeScreen(){
    let posOrNeg = '+';
    let i = 0;
    let shake = () => {
      if (i === 15){
        this.setState({ shake: 'translate(0, 0)' });
        return;
      }
      window.setTimeout(() => {
        posOrNeg = posOrNeg === '-' ? '+' : '-';
        this.setState({ shake: `translate(${posOrNeg}${i}px, 0)` });
        shake();
      }, 80);
      i++
    };
    shake();
  }

  createMoleHoles(){
    var holes = [];
    for(let i = 1; i <= 9; i++){
      holes.push(<MoleHole key={ i } context={ this.state }
        onClick={ this.addToScore.bind(this) } holeNumber={ i }/>);
    }
    return (
      <div className="board">
        { holes }
      </div>
    );
  }

  adjustDifficulty() {
    const { score } = this.state;

    // You can define your own logic to adjust difficulty based on the player's score
    if (score >= 10) {
      return 'hard';
    } else if (score >= 5) {
      return 'medium';
    } else {
      return 'easy';
    }
  }

  getDifficultyMultiplier() {
    const { difficulty } = this.state;

    // You can define your own multiplier values for each difficulty level
    switch (difficulty) {
      case 'hard':
        return 2.0;
      case 'medium':
        return 1.0;
      case 'easy':
        return 0.8;
      default:
        return 2.0;
    }
  }

  render() {
    return (
      <div className='wackgameb'>
      <div className="main-container">
        <div className="game" style={{ WebkitTransform: this.state['shake'] }}>
          <h1 className="game__title" style={{ margin: this.state.titleMargin }}>
            WHACK-A-MOLE
          </h1>
          {/* Access ref using this.gameOverRef */}
          <GameOver ref={this.gameOverRef} context={this} />
          <div className="game__button-container">
            {/* Access ref using this.gameOverRef */}
            <StartButton
              context={this.state}
              onClick={() => this.timeOut(2000)}
            />
          </div>
          {this.createMoleHoles()}
          <Score context={this.state} />
        </div>
      </div>
      </div>
    );
  }
}

export default WackApp;