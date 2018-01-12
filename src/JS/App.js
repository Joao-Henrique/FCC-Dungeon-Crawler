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

    // 1 - here it builds the board
    this.state = {
      gameBoard: Array(this.rows)
        .fill()
        .map(() => Array(this.cols).fill(false))
    }
  }

  // UPDATE STATE WITH COODENATES SENT FROM CHILD(GRID) COMPONENT
  updateHeroNextPosition = (y, x) => {

    // 2 - here it builds the board again ...to make sure everything stays false
    this.setState({
      gameBoard: Array(this.rows)
        .fill()
        .map(() => Array(this.cols).fill(false))
    });

    // 3 - and finaly it updates the "hero" position
    let stateCopy = Object.assign({}, this.state);
    stateCopy.gameBoard[x][y] = true;
    this.setState(stateCopy);
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
              <Grid
                gameBoard={this.state.gameBoard}
                updateHeroNextPosition={this.updateHeroNextPosition}
                updateHeroLastPosition={this.updateHeroLastPosition}
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
}

export default App;
