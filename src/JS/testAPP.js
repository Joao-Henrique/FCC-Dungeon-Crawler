
import React, { Component } from 'react';


class App extends Component {
  constructor() {
    super();
    this.cols = 30;
    this.rows = 20;
    this.state = {
      gameBoard: dungeon1,

    }
  }

  ///////////////////////////////////////////////////////////
  /* GAME LOGIC */
  ///////////////////////////////////////////////////////////
  handleKeyPress = (e) => {
    e.preventDefault();

    const updateGameBoard = (y, x) => {
      let stateCopy = Object.assign({}, this.state);
      /* Duvida nº 1 - Quando se faz uma cópia do state deve-se fazer só de uma parte ou pode-se copiar o state todo?
      Duvida nº 2 - A cópia do state deve ser feita usando o Object.assign ou o object spread opreator? */

      for (let i = 0; i < this.cols; i++) {
        for (let j = 0; j < this.rows; j++) {


          const heroMoveValidation = () => {
            switch (this.state.gameBoard[j + x][i + y]) {
              /* tem mais casos aqui mas não tem importância para o problema */
              default:
                stateCopy.gameBoard[j + x][i + y] = "1";
                stateCopy.gameBoard[j][i] = "0";
                console.log(this.state.gameBoard);

                /* Duvida nº 3 - Se eu estou a fazer uma cópia do state e a alterar essa cópia, porque razão o state muda mesmo que eu retire o setState() na linha */
                break;
            }
          }

          switch (this.state.gameBoard[j][i]) {
            /* tem mais casos aqui mas não tem importância para o problema */
            case "1":
              heroMoveValidation();
              break;
            default:
              stateCopy.gameBoard[j][i] = "0";
          }
        }
      }
      this.setState({ stateCopy });
      /* Dúvida nº 4 - Qual a melhor forma de fazer o setState? */
    }

    // deals with user keypress
    switch (e.keyCode) {
      // up
      case 38:
        updateGameBoard(0, -1);
        break;
      // right
      case 39:
        updateGameBoard(1, 0);
        break;
      // down
      case 40:
        updateGameBoard(0, 1);
        break;
      // left
      case 37:
        updateGameBoard(-1, 0);
        break;
      default:
        return;
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUpdate() {
    // changes hero level every 2500xp
    if (as) {
      let stateCopy = Object.assign({}, this.state);
      /* something */
      this.setState(stateCopy);
    }
  }

  render() {
    return (
      <div className="App">
        <Grid
          gameBoard={this.state.gameBoard}
          rows={this.rows}
          cols={this.cols} />
      </div>
    )
  }
}

export default App;
