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
        weapon: "Hands",
        weaponChoice: [
          "Stick", "Nife", "Catana", "ChainSaw"
        ],
        weaponDamage: 1,
        enemyHealth: 100,
        level: 1,
        toNextLevel: 2500,
        score: 0,
        dungeon: 1
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
                //wall
              case "9":
                stateCopy.gameBoard[j][i] = "1";
                break;
                //enemy
              case "2":
                if (stateCopy.hero.health < 0) {
                  stateCopy.gameBoard[j][i] = "0";
                  alert("GAME OVER!!! You are a dead box ;)")
                } else if (stateCopy.hero.enemyHealth > 0) {
                  stateCopy.gameBoard[j][i] = "1";
                  stateCopy.hero.enemyHealth = stateCopy.hero.enemyHealth - (this.generateRandomNumber(30, 20) * (stateCopy.hero.weaponDamage + stateCopy.hero.level - 1));
                  stateCopy.hero.health = stateCopy.hero.health - (this.generateRandomNumber(30, 20) * stateCopy.hero.dungeon);
                } else {
                  stateCopy.gameBoard[j + x][i + y] = "0";
                  stateCopy.hero.enemyHealth = 100;
                  stateCopy.hero.score += 100;
                  stateCopy.hero.toNextLevel -= 100;
                }
                break;
                //weapon
              case "5":
                stateCopy.gameBoard[j + x][i + y] = "0";
                stateCopy.gameBoard[j][i] = "1";
                stateCopy.hero.weapon = stateCopy.hero.weaponChoice[stateCopy.hero.dungeon - 1];
                alert("You just found a " + stateCopy.hero.weaponChoice[stateCopy.hero.dungeon - 1] + " to fight with!");
                stateCopy.hero.weaponDamage++;
                break;
                //score
              case "6":
                stateCopy.gameBoard[j + x][i + y] = "0";
                stateCopy.gameBoard[j][i] = "1";
                stateCopy.hero.score += 100;
                stateCopy.hero.toNextLevel -= 100;
                break;
                //health
              case "7":
                stateCopy.gameBoard[j + x][i + y] = "0";
                stateCopy.gameBoard[j][i] = "1";
                stateCopy.hero.health = stateCopy.hero.health + 100;
                break;
                //portal
              case "8":
                alert("You have cleared the dungeon nº " + stateCopy.hero.dungeon + " !!!");
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
              //weapon
            case "5":
              stateCopy.gameBoard[j][i] = "5";
              break;
              //score
            case "6":
              stateCopy.gameBoard[j][i] = "6";
              break;
              //health
            case "7":
              stateCopy.gameBoard[j][i] = "7";
              break;
              //portal
            case "8":
              stateCopy.gameBoard[j][i] = "8";
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
  generateRandomNumber = (max, min) => {
    return Math.floor(Math.random() * (max - (min + 1)) + min);
  }

  randomlyPlaceItem = (item, numberOfItems) => {
    let stateCopy = Object.assign({}, this.state);
    for (let i = numberOfItems; i > 0;) {
      let row = this.generateRandomNumber(this.rows, 1);
      let col = this.generateRandomNumber(this.cols, 1);
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
    window.addEventListener('keydown', this.handleKeyPress);
    //enemy
    this.randomlyPlaceItem("2", 10);
    //weapon
    this.randomlyPlaceItem("5", 1);
    //score
    this.randomlyPlaceItem("6", 20);
    //health
    this.randomlyPlaceItem("7", 8);
  }

  componentWillUpdate() {
    if (this.state.hero.toNextLevel <= 0) {
      let stateCopy = Object.assign({}, this.state);
      stateCopy.hero.toNextLevel = 2500;
      stateCopy.hero.level += 1;
      this.setState(stateCopy);
    }
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
