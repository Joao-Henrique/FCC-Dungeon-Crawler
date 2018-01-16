import React, {Component} from 'react';
import logo from '../IMG/logo.svg';
import FooterInstance from './Footer';
import ProjectDescription from './ProjectDescription';
import Menu from './Menu';
import Grid from './Grid';
import dungeon1 from '../Maps/dungeon1';

class App extends Component {
  constructor() {
    super();
    this.cols = 30;
    this.rows = 20;
    this.state = {
      gameBoard: [],
      hero: {
        health: 100,
        weapon: "Stick",
        atack: 10,
        level: 1,
        xp: 30,
        dungeon: 1
      },
      enemy: {
        health: 100,
        level: 1
      }
    }
  }

  ///////////////////////////////////////////////////////////
  /* GAME LOGIC */
  ///////////////////////////////////////////////////////////
  handleKeyPress = (e) => {
    const updateGameBoard = (y, x) => {
      let stateCopy = Object.assign({}, this.state);
      for (let i = 0; i < this.cols; i++) {
        for (let j = 0; j < this.rows; j++) {

          const heroMoveValidation = () => {
            switch (this.state.gameBoard[j + x][i + y]) {
              case "9":
                stateCopy.gameBoard[j][i] = "1";
                break;
              case "2":
                stateCopy.gameBoard[j][i] = "1";
                break;
              default:
                stateCopy.gameBoard[j + x][i + y] = "1";
                stateCopy.gameBoard[j][i] = "0";
            }
          }

          switch (this.state.gameBoard[j][i]) {
              //wall
            case "9":
              stateCopy.gameBoard[j][i] = "9";
              break;
              //enemy
            case "2":
              stateCopy.gameBoard[j][i] = "2";
              break;
              //hero
            case "1":
              heroMoveValidation();
              break;
            default:
              stateCopy.gameBoard[j][i] = "0";
          }
        }
      }
      this.setState(stateCopy);
    }

    switch (e.keyCode) {
        // up
      case 38:
      case 87:
        updateGameBoard(0, -1);
        break;
        // right
      case 39:
      case 68:
        updateGameBoard(1, 0);
        break;
        // down
      case 40:
      case 83:
        updateGameBoard(0, 1);
        break;
        // left
      case 37:
      case 65:
        updateGameBoard(-1, 0);
        break;
      default:
        return;
    }
  }

  ///////////////////////////////////////////////////////////
  /* ALL ITEMS AND ENEMIES ARE RANDOMLY PLACED ON THE MAP */
  ///////////////////////////////////////////////////////////
  generateRandomNumber = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }

  randomlyPlaceItem = (item, numberOfItems) => {
    let stateCopy = Object.assign({}, this.state);
    for (let i = numberOfItems; i > 0;) {
      let row = this.generateRandomNumber(this.rows);
      let col = this.generateRandomNumber(this.cols);
      if (stateCopy.gameBoard[row][col] === "0") {
        stateCopy.gameBoard[row][col] = item;
        i--;
      }
    }
    this.setState(stateCopy)
  }

  ///////////////////////////////////////////////////////////
  /* LIFECYCLE METHODS */
  ///////////////////////////////////////////////////////////
  componentWillMount() {
    this.setState({gameBoard: dungeon1})

  }

  componentDidMount() {
    //enemy
    this.randomlyPlaceItem("2", 10);
    //weapon
    this.randomlyPlaceItem("5", 1);
    //xp
    this.randomlyPlaceItem("6", 20);
    //health
    this.randomlyPlaceItem("7", 10);
    window.addEventListener('keydown', this.handleKeyPress);
  }

  ///////////////////////////////////////////////////////////
  /* RENDER METHOD */
  ///////////////////////////////////////////////////////////
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
              <Menu heroStats={this.state.hero}/>
              <Grid
                selectBox={this.selectBox}
                gameBoard={this.state.gameBoard}
                rows={this.rows}
                cols={this.cols}/>
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

  ///////////////////////////////////////////////////////////
  /* ACTIVATE - IF YOU NEED TO DRAW NEW MAPS */
  ///////////////////////////////////////////////////////////
  selectBox = (row, col) => {
    const arrayClone = (arr) => {
      return JSON.parse(JSON.stringify(arr));
    }
    let gridCopy = arrayClone(this.state.gameBoard);
    gridCopy[row][col] === "9"
      ? gridCopy[row][col] = "0"
      : gridCopy[row][col] = "9";

    this.setState({gameBoard: gridCopy})
    console.log(this.state.gameBoard);
  }
}

export default App;
