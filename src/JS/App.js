import React, {Component} from 'react';
import logo from '../IMG/logo.svg';
import FooterInstance from './Footer';
import ProjectDescription from './ProjectDescription';
import Menu from './Menu';
import Grid from './Grid';

class App extends Component {

  constructor() {
    super();
    this.cols = 30;
    this.rows = 20;

    this.state = {

      // GAMEBOARD
      gameBoard: Array(this.rows)
        .fill()
        .map(() => Array(this.cols).fill(false)),

      // HERO
      hero: {
        position: {
          coordenateX: 10,
          coordenateY: 10
        }
      }
    }
  }

  // MOVE HERO BASED ON USER INPUT
  handleKeyPress = (e) => {

    const changePositionX = (value) => {
      this.setState({
        hero: {
          position: {
            ...this.state.hero.position,
            coordenateX: this.state.hero.position.coordenateX + value
          }
        }
      });
    }

    const changePositionY = (value) => {
      this.setState({
        hero: {
          position: {
            ...this.state.hero.position,
            coordenateY: this.state.hero.position.coordenateY + value
          }
        }
      });
    }

    // UPDATES GAMEBOARD
    const updateGameBoard = () => {

      // RETURN THE EXACT CELL WHERE HERO IS
      let coordY = this.state.hero.position.coordenateY;
      let coordX = this.state.hero.position.coordenateX;

      // COPIES THE GAMEBOARD
      let stateCopy = Object.assign({}, this.state);
      // UPDATES ITEMS POSITIONS
      for (let i = 0; i < this.cols; i++) {
        for (let j = 0; j < this.rows; j++) {
          if (coordY === i && coordX === j) {
            stateCopy.gameBoard[j][i] = "heroCell";
          } else {
            stateCopy.gameBoard[j][i] = "floorCell";
          }
        }
      }
      this.setState(stateCopy);
    }

    // MOVES THE HERO WHEN USER PRESSES KEY
    switch (e.keyCode) {
        // up
      case 38:
      case 87:
        changePositionX(-1);
        updateGameBoard();
        break;
        // right
      case 39:
      case 68:
        changePositionY(1);
        updateGameBoard();
        break;
        // down
      case 40:
      case 83:
        changePositionX(1);
        updateGameBoard();
        break;
        // left
      case 37:
      case 65:
        changePositionY(-1);
        updateGameBoard();
        break;
      default:
        return;
    }
  }

  // LISTEN FOR USER INPUT
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);

    // UPDATES GAMEBOARD - THIS FUNCTION IS DEFINED TWICE - IT WILL BE DEALTH WITH
    // ASAP
    const updateGameBoard = () => {

      // RETURN THE EXACT CELL WHERE HERO IS
      let coordY = this.state.hero.position.coordenateY;
      let coordX = this.state.hero.position.coordenateX;

      // COPIES THE GAMEBOARD
      let stateCopy = Object.assign({}, this.state);
      // UPDATES ITEMS POSITIONS
      for (let i = 0; i < this.cols; i++) {
        for (let j = 0; j < this.rows; j++) {
          if (coordY === i && coordX === j) {
            stateCopy.gameBoard[j][i] = "heroCell";
          } else {
            stateCopy.gameBoard[j][i] = "floorCell";
          }
        }
      }
      this.setState(stateCopy);
    }
    updateGameBoard();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">FCC Dungeon Crawler by João Henrique</h1>
        </header>
        <h1>Roguelike Dungeon Crawler Game</h1>
        <div className="row">
          <div className="col-md-6 projectSection">
            <div className="wraper">
              <Menu/>
              <Grid gameBoard={this.state.gameBoard} rows={this.rows} cols={this.cols}/>
            </div>
          </div>
          <div className="col-md-6 information">
            <ProjectDescription/>
          </div>
        </div>
        <FooterInstance/>
      </div>
    )
  }
}

export default App;
