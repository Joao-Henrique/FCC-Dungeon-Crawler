
///////////////////////////////////////////////////////////
/* TODO LIST */
///////////////////////////////////////////////////////////
/*

4 - Bug - When hero moves to certain directions it goes all the way till the end. It should move one square at a time.

5 - Bug - When hero dies, the map is not reseting properly. Hero stays in the dying spot.

6 - Bug - When map changes should update view area. Not working.

*/

import React, { Component } from 'react';
import ProjectDescription from './ProjectDescription';
import dungeon1 from '../Maps/dungeon1';
import dungeon2 from '../Maps/dungeon2';
import dungeon3 from '../Maps/dungeon3';
import dungeon4 from '../Maps/dungeon4';
import BottomMenu from './BottomMenu';
import logo from '../IMG/logo.svg';
import TopMenu from './TopMenu';
import Grid from './Grid';

class App extends Component {
  constructor() {
    super();
    this.cols = 30;
    this.rows = 20;
    this.state = {
      gameBoard: dungeon1,
      hero: {
        health: 100,
        weapon: "Hands",
        weaponDamage: 1,
        enemyHealth: 100,
        bossHealth: 2500,
        enemyLevel: 1,
        level: 1,
        toNextLevel: 2500,
        score: 0,
        dungeon: 1,
        weaponChoice: ["Stick", "Nife", "Catana", "ChainSaw"]
      }
    }
  }




  handleKeyPress = (e) => {
    e.preventDefault();
    switch (e.keyCode) {
      // up
      case 38:
        this.updateGameBoard(0, -1);
        break;
      // right
      case 39:
        this.updateGameBoard(1, 0);
        break;
      // down
      case 40:
        this.updateGameBoard(0, 1);
        break;
      // left
      case 37:
        this.updateGameBoard(-1, 0);
        break;
      default:
        return;
    }
  }

  updateGameBoard = (y, x) => {
    let stateCopy = Object.assign({}, this.state);
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        switch (this.state.gameBoard[j][i]) {
          case "9"://wall
            stateCopy.gameBoard[j][i] = "9";
            break;
          case "2"://enemy
            stateCopy.gameBoard[j][i] = "2";
            break;
          case "3"://boss
            stateCopy.gameBoard[j][i] = "3";
            break;
          case "5"://weapon
            stateCopy.gameBoard[j][i] = "5";
            break;
          case "6"://score
            stateCopy.gameBoard[j][i] = "6";
            break;
          case "7"://health
            stateCopy.gameBoard[j][i] = "7";
            break;
          case "8"://portal
            stateCopy.gameBoard[j][i] = "8";
            break;
          case "1"://hero
            this.heroMoveValidation(stateCopy, i, j, x, y);
            this.heroViewArea(j, i);
            break;
          default:
            stateCopy.gameBoard[j][i] = "0";
        }
      }
    }
    this.setState({ stateCopy });
  }

  heroMoveValidation = (stateCopy, i, j, x, y) => {
    switch (stateCopy.gameBoard[j + x][i + y]) {
      //wall
      case "9":
        stateCopy.gameBoard[j][i] = "1";
        break;
      //enemy
      case "2":
        if (stateCopy.hero.enemyHealth > 0) {
          stateCopy.gameBoard[j][i] = "1";
          stateCopy.hero.enemyHealth = stateCopy.hero.enemyHealth - (this.generateRandomNumber(30, 10) * (stateCopy.hero.weaponDamage + stateCopy.hero.level - 1));
          stateCopy.hero.health = stateCopy.hero.health - (this.generateRandomNumber(30, 10) * (stateCopy.hero.enemyLevel));
        } else {
          stateCopy.gameBoard[j + x][i + y] = "0";
          stateCopy.hero.toNextLevel -= 100;
          stateCopy.hero.enemyHealth = 100;
          stateCopy.hero.score += 100;
        }
        break;
      //boss
      case "3":
        if (stateCopy.hero.bossHealth > 0) {
          stateCopy.gameBoard[j][i] = "1";
          stateCopy.hero.bossHealth = stateCopy.hero.bossHealth - (this.generateRandomNumber(30, 10) * (stateCopy.hero.weaponDamage + stateCopy.hero.level - 1));
          stateCopy.hero.health = stateCopy.hero.health - (this.generateRandomNumber(30, 10));
        } else {
          stateCopy.gameBoard[j + x][i + y] = "0";
          stateCopy.hero.score += 5000;
          alert("CONGRATULATIONS!!! You have FINISHED THE GAME!!! Your total score is " + this.state.hero.score + "XP")
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
        stateCopy.hero.toNextLevel -= 100;
        stateCopy.hero.score += 100;
        break;
      //health
      case "7":
        stateCopy.hero.health = stateCopy.hero.health + 100;
        stateCopy.gameBoard[j + x][i + y] = "0";
        stateCopy.gameBoard[j][i] = "1";
        break;
      //portal
      case "8":
        stateCopy.gameBoard[j][i] = "8";
        this.nextLevel();
        this.randomlyPlaceAllItems();
        break;
      default:
        stateCopy.gameBoard[j + x][i + y] = "1";
        stateCopy.gameBoard[j][i] = "0";
        break;
    }
  }

  nextLevel = () => {
    switch (this.state.hero.dungeon) {
      case 1:
        alert("You have cleared the dungeon nº " + this.state.hero.dungeon + " !!!");
        this.setState({ gameBoard: dungeon2 });
        this.setState({ hero: { ...this.state.hero, dungeon: 2, enemyLevel: 2 } });
        break;
      case 2:
        alert("You have cleared the dungeon nº " + this.state.hero.dungeon + " !!!");
        this.setState({ gameBoard: dungeon3 });
        this.setState({ hero: { ...this.state.hero, dungeon: 3, enemyLevel: 3 } });
        break;
      case 3:
        alert("You have cleared the dungeon nº " + this.state.hero.dungeon + " !!!");
        this.setState({ gameBoard: dungeon4 });
        this.setState({ hero: { ...this.state.hero, dungeon: 4, enemyLevel: 4 } });
        break;
      default:
        alert("You have cleared the dungeon nº " + this.state.hero.dungeon + " !!!");
        alert("Congratilations!!! You have finished the game");
    };
  }

  heroViewArea = (j, i) => {
    var wrapper = document.getElementById('container');
    wrapper.scrollTop = (j * 40) - 160;
    wrapper.scrollLeft = (i * 40) - 200;
  }

  heroLevelUp = () => {
    if (this.state.hero.toNextLevel <= 0) {
      let stateCopy = Object.assign({}, this.state.hero);
      stateCopy.toNextLevel = 1500;
      stateCopy.level += 1;
      this.setState({ ...this.state.hero, hero: stateCopy });
      alert("You are getting stronger! Your skills have reach level " + stateCopy.level + " !!!");
    }
  }

  heroGameOver = () => {
    if (this.state.hero.health < 0) {
      alert("GAME OVER!!! You are a dead box ;)")
      this.resetGame();
    }
  }

  resetGame = () => {
    this.setState({
      hero: {
        health: 100,
        weapon: "Hands",
        weaponDamage: 1,
        enemyHealth: 100,
        bossHealth: 2500,
        enemyLevel: 1,
        level: 1,
        toNextLevel: 2500,
        score: 0,
        dungeon: 1,
        weaponChoice: ["Stick", "Nife", "Catana", "ChainSaw"]
      }
    })
    this.setState({ gameBoard: dungeon1 })
    this.heroViewArea(20, 0);
    this.randomlyPlaceAllItems();
  }

  generateRandomNumber = (max, min) => {
    return Math.floor(Math.random() * (max - (min + 1)) + min);
  }

  randomlyPlaceItem = (item, numberOfItems) => {
    let stateCopy = Object.assign({}, this.state.gameBoard);
    for (let i = numberOfItems; i > 0;) {
      let row = this.generateRandomNumber(this.rows, 1);
      let col = this.generateRandomNumber(this.cols, 1);
      if (stateCopy[row][col] === "0") {
        stateCopy[row][col] = item;
        i--;
      }
    }
    this.setState({ gameBoard: stateCopy })
  }

  randomlyPlaceAllItems = () => {
    //enemy
    this.randomlyPlaceItem("2", 10);
    //weapon
    this.randomlyPlaceItem("5", 1);
    //score
    this.randomlyPlaceItem("6", 20);
    //health
    this.randomlyPlaceItem("7", 12);
  }




  ///////////////////////////////////////////////////////////
  /* LIFECYCLE METHODS */
  ///////////////////////////////////////////////////////////
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
    this.heroViewArea(20, 0);
    this.randomlyPlaceAllItems();
  }

  componentDidUpdate() {
    this.heroLevelUp();
    this.heroGameOver();
  }




  ///////////////////////////////////////////////////////////
  /* RENDER METHOD */
  ///////////////////////////////////////////////////////////
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">FCC Dungeon Crawler by João Henrique</h1>
        </header>
        <h1>Roguelike Dungeon Crawler Game</h1>
        <div className="row">
          <div className="col-md-6 projectSection">
            <div className="wraper">
              <div className="gameContainer">
                <TopMenu heroStats={this.state.hero} />
                <div id="container">
                  <Grid
                    selectBox={this.selectBox}
                    gameBoard={this.state.gameBoard}
                    rows={this.rows}
                    cols={this.cols} />
                </div>
                <BottomMenu heroStats={this.state.hero} />
              </div>
            </div>
          </div>
          <div className="col-md-6 information">
            <ProjectDescription />
          </div>
        </div>
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
    // uncomment this part to activate:
    /* this.setState({ gameBoard: gridCopy })
    console.log(gridCopy); */
  }
}

export default App;
