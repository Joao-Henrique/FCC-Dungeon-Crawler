import React, {Component} from 'react';
import ProjectDescription from './ProjectDescription';
import dungeon1 from '../Maps/dungeon1';
import dungeon2 from '../Maps/dungeon2';
import dungeon3 from '../Maps/dungeon3';
import dungeon4 from '../Maps/dungeon4';
import BottomMenu from './BottomMenu';
import Footer from './Footer';
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
        heroPositionX: 16,
        heroPositionY: 4,
        health: 100,
        weapon: "Hands",
        weaponDamage: 1,
        enemyHealth: 100,
        bossHealth: 2700,
        enemyLevel: 1,
        level: 1,
        toNextLevel: 1500,
        score: 0,
        dungeon: 1,
        weaponChoice: ["Stick", "Nife", "Catana", "ChainSaw"]
      }
    }
  }

  ///////////////////////////////////////////////////////////
  /* HERO MOVEMENT */
  ///////////////////////////////////////////////////////////

  handleKeyPress = (e) => {
    e.preventDefault();
    switch (e.keyCode) {
        // up
      case 38:
        this.heroMoveValidation(0, -1);
        break;
        // right
      case 39:
        this.heroMoveValidation(1, 0);
        break;
        // down
      case 40:
        this.heroMoveValidation(0, 1);
        break;
        // left
      case 37:
        this.heroMoveValidation(-1, 0);
        break;
      default:
        return;
    }
  }

  heroMoveValidation = (y, x) => {
    switch (this.state.gameBoard[this.state.hero.heroPositionX + x][this.state.hero.heroPositionY + y]) {
        //wall
      case "9":
        break;
        //enemy
      case "2":
        this.heroFightEnemy(x, y);
        break;
        //boss
      case "3":
        this.heroFightBoss(x, y);
        break;
        //weapon
      case "5":
        this.heroGetsWeapon(x, y);
        break;
        //score
      case "6":
        this.heroGetsScore(x, y);
        break;
        //health
      case "7":
        this.heroGetsHealth(x, y);
        break;
        //portal
      case "8":
        this.nextLevel();
        this.randomlyPlaceAllItems();
        break;
      default:
        this.heroClearPastPosition();
        this.heroMovesToNextPosition(this.state.hero.heroPositionX + x, this.state.hero.heroPositionY + y);
        break;
    }
  }

  heroCurrentPosition = () => {
    let stateCopy = Object.assign({}, this.state.gameBoard);
    stateCopy[this.state.hero.heroPositionX][this.state.hero.heroPositionY] = "1";
    this.setState({stateCopy})
  }

  heroClearPastPosition = () => {
    let stateCopy = Object.assign({}, this.state.gameBoard);
    stateCopy[this.state.hero.heroPositionX][this.state.hero.heroPositionY] = "0";
    this.setState({stateCopy})
  }

  heroMovesToNextPosition = (x, y) => {
    this.setState({
      hero: {
        ...this.state.hero,
        heroPositionX: x,
        heroPositionY: y
      }
    })
    this.heroCurrentPosition(x, y);
    this.heroViewArea(x, y);
  }

  heroViewArea = (x, y) => {
    var wrapper = document.getElementById('container');
    wrapper.scrollTop = (x * 40) - 160;
    wrapper.scrollLeft = (y * 40) - 200;
  }

  ///////////////////////////////////////////////////////////
  /* HERO / ITEMS INTERACTION */
  ///////////////////////////////////////////////////////////
  heroFightEnemy = (x, y) => {
    let stateCopy = Object.assign({}, this.state.hero);
    if (stateCopy.enemyHealth > 0) {
      let enemyHealth = stateCopy.enemyHealth - Math.floor(this.generateRandomNumber(30, 10) * (stateCopy.weaponDamage + (stateCopy.level / 3)));
      let health = stateCopy.health - (this.generateRandomNumber(30, 10) * (stateCopy.enemyLevel));
      this.setState({
        ...this.state,
        hero: {
          ...this.state.hero,
          enemyHealth: enemyHealth,
          health: health
        }
      })
    } else {
      this.heroClearPastPosition();
      this.heroMovesToNextPosition(this.state.hero.heroPositionX + x, this.state.hero.heroPositionY + y);
      let toNextLevel = stateCopy.toNextLevel - 100;
      let enemyHealth = 100;
      let score = stateCopy.score + 100;
      this.setState({
        ...this.state,
        hero: {
          ...this.state.hero,
          toNextLevel: toNextLevel,
          enemyHealth: enemyHealth,
          score: score
        }
      })
    }
  }

  heroFightBoss = (x, y) => {
    let stateCopy = Object.assign({}, this.state.hero);
    if (stateCopy.bossHealth > 0) {
      let bossHealth = stateCopy.bossHealth - Math.floor(this.generateRandomNumber(30, 10) * (stateCopy.weaponDamage + (stateCopy.level / 3)));
      let health = stateCopy.health - (this.generateRandomNumber(30, 10));
      this.setState({
        ...this.state,
        hero: {
          ...this.state.hero,
          bossHealth: bossHealth,
          health: health
        }
      })
    } else {
      this.heroClearPastPosition();
      this.heroMovesToNextPosition(this.state.hero.heroPositionX + x, this.state.hero.heroPositionY + y);
      let score = stateCopy.score + 5000;
      this.setState({
        ...this.state,
        hero: {
          ...this.state.hero,
          score: score
        }
      })
      alert("CONGRATULATIONS!!! You have FINISHED THE GAME!!! Your total score is " + this.state.hero.score + "XP")
      window
        .location
        .reload(true);
    }
  }

  heroGetsWeapon = (x, y) => {
    let stateCopy = Object.assign({}, this.state.hero);
    this.heroClearPastPosition();
    this.heroMovesToNextPosition(this.state.hero.heroPositionX + x, this.state.hero.heroPositionY + y);
    let weapon = stateCopy.weaponChoice[stateCopy.dungeon - 1];
    let weaponDamage = stateCopy.weaponDamage + 1;
    alert("You just found a " + stateCopy.weaponChoice[stateCopy.dungeon - 1] + " to fight with!");
    this.setState({
      ...this.state,
      hero: {
        ...this.state.hero,
        weapon: weapon,
        weaponDamage: weaponDamage
      }
    })
  }

  heroGetsScore = (x, y) => {
    let stateCopy = Object.assign({}, this.state.hero);
    this.heroClearPastPosition();
    this.heroMovesToNextPosition(this.state.hero.heroPositionX + x, this.state.hero.heroPositionY + y);
    let toNextLevel = stateCopy.toNextLevel -= 100;
    let score = stateCopy.score += 100;
    this.setState({
      ...this.state,
      hero: {
        ...this.state.hero,
        toNextLevel: toNextLevel,
        score: score
      }
    })
  }

  heroGetsHealth = (x, y) => {
    let stateCopy = Object.assign({}, this.state.hero);
    this.heroClearPastPosition();
    this.heroMovesToNextPosition(this.state.hero.heroPositionX + x, this.state.hero.heroPositionY + y);
    let health = stateCopy.health + 100;
    this.setState({
      ...this.state,
      hero: {
        ...this.state.hero,
        health: health
      }
    })
  }

  ///////////////////////////////////////////////////////////
  /* UTILITIES */
  ///////////////////////////////////////////////////////////
  nextLevel = () => {
    switch (this.state.hero.dungeon) {
      case 1:
        alert("You have cleared the dungeon nº " + this.state.hero.dungeon + " !!!");
        this.setState({gameBoard: dungeon2});
        this.setState({
          hero: {
            ...this.state.hero,
            dungeon: 2,
            enemyLevel: 2,
            heroPositionX: 16,
            heroPositionY: 4
          }
        });
        this.heroViewArea(20, 0);
        break;
      case 2:
        alert("You have cleared the dungeon nº " + this.state.hero.dungeon + " !!!");
        this.setState({gameBoard: dungeon3});
        this.setState({
          hero: {
            ...this.state.hero,
            dungeon: 3,
            enemyLevel: 3,
            heroPositionX: 16,
            heroPositionY: 4
          }
        });
        this.heroViewArea(20, 0);
        break;
      case 3:
        alert("You have cleared the dungeon nº " + this.state.hero.dungeon + " !!!");
        this.setState({gameBoard: dungeon4});
        this.setState({
          hero: {
            ...this.state.hero,
            dungeon: 4,
            enemyLevel: 4,
            heroPositionX: 16,
            heroPositionY: 4
          }
        });
        this.heroViewArea(20, 0);
        break;
      default:
        alert("You have cleared the dungeon nº " + this.state.hero.dungeon + " !!!");
        alert("Congratilations!!! You have finished the game");
    };
  }

  heroLevelUp = () => {
    let stateCopy = Object.assign({}, this.state.hero);
    stateCopy.toNextLevel = 1500;
    stateCopy.level += 1;
    this.setState({
      ...this.state.hero,
      hero: stateCopy
    });
    alert("You are getting stronger! Your skills have reach level " + stateCopy.level + " !!!");
  }

  heroGameOver = () => {
    alert("GAME OVER!!! You are a dead box ;)")
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
    this.setState({gameBoard: stateCopy})
  }

  randomlyPlaceAllItems = () => {
    //enemy
    this.randomlyPlaceItem("2", 10);
    //weapon
    this.randomlyPlaceItem("5", 1);
    //score
    this.randomlyPlaceItem("6", 20);
    //health
    this.randomlyPlaceItem("7", 9);
  }

  ///////////////////////////////////////////////////////////
  /* LIFECYCLE METHODS */
  ///////////////////////////////////////////////////////////
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
    this.heroCurrentPosition();
    this.heroViewArea(20, 0);
    this.randomlyPlaceAllItems();
  }

  componentDidUpdate() {
    if (this.state.hero.health < 0) {
      this.heroGameOver();
      window
        .location
        .reload(true);
    } else if (this.state.hero.toNextLevel <= 0) {
      this.heroLevelUp();
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
              <div className="gameContainer">
                <TopMenu heroStats={this.state.hero}/>
                <div id="container">
                  <Grid
                    selectBox={this.selectBox}
                    gameBoard={this.state.gameBoard}
                    rows={this.rows}
                    cols={this.cols}
                    dungeon={this.state.hero.dungeon}
                    weaponDamage={this.state.hero.weaponDamage}/>
                </div>
                <BottomMenu heroStats={this.state.hero}/>
              </div>
            </div>
          </div>
          <div className="col-md-6 information">
            <ProjectDescription/>
          </div>
        </div>
        <Footer/>
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
