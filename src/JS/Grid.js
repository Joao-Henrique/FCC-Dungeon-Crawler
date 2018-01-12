import React, {Component} from 'react';
import Box from './Box';

class Grid extends Component {

  constructor() {
    super();
    this.state = {

      //HERO
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

    // FUNCTION TO SEND EVENT TO PARENT COMPONENT - THIS FUNCTION IS BEING DEFINED
    // TWICE BECAUSE OF SCOOPE - HAVE TO DEAL WITH THAT LATER
    const sendNextPositionToParent = () => {
      let coordY = this.state.hero.position.coordenateY;
      let coordX = this.state.hero.position.coordenateX;
      this
        .props
        .updateHeroNextPosition(coordY, coordX);
    }

    switch (e.keyCode) {
        // up
      case 38:
      case 87:
        changePositionX(-1);
        sendNextPositionToParent();
        break;
        // right
      case 39:
      case 68:
        changePositionY(1);
        sendNextPositionToParent();
        break;
        // down
      case 40:
      case 83:
        changePositionX(1);
        sendNextPositionToParent();
        break;
        // left
      case 37:
      case 65:
        changePositionY(-1);
        sendNextPositionToParent();
        break;
      default:
        return;
    }
  }

  // LISTEN FOR USER INPUT
  componentDidMount() {

    // FUNCTION TO SEND EVENT TO PARENT COMPONENT - THIS FUNCTION IS BEING DEFINED
    // TWICE BECAUSE OF SCOOPE - HAVE TO DEAL WITH THAT LATER
    const sendNextPositionToParent = () => {
      let coordY = this.state.hero.position.coordenateY;
      let coordX = this.state.hero.position.coordenateX;
      this
        .props
        .updateHeroNextPosition(coordY, coordX);
    }

    window.addEventListener('keydown', this.handleKeyPress);
    sendNextPositionToParent();
  }

  render() {

    // DRAW THE GRID
    const width = this.props.cols * 20;
    let rowsArr = [];
    let boxClass = "";
    for (let i = 0; i < this.props.rows; i++) {
      for (let j = 0; j < this.props.cols; j++) {
        const boxId = i + "_" + j;
        const boxPosition = this.props.gameBoard[i][j];

        // VERIFY CONDITIONS BASED ON STATE TO UPDATE
        switch (boxPosition) {
          case true:
            (boxClass = "box on");
            break;
          default:
            (boxClass = "box off");
            break;
        }

        // UPDATE BOX PROPERTIES
        rowsArr.push(<Box
          boxClass={boxClass}
          key={boxId}
          boxId={boxId}
          row={i}
          col={j}
          boxPosition={boxPosition}/>)
      }
    }

    return (
      <div className="grid" style={{
        width: width
      }}>
        {rowsArr}
      </div>
    );
  }
}

export default Grid;