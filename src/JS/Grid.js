import React, {Component} from 'react';
import Box from './Box';

class Grid extends Component {

  constructor() {
    super();
    this.state = {
      // HERO INITIAL POSITIONING
      coordenateX: 10,
      coordenateY: 10
    }
  }

  // MOVE HERO BASED ON USER INPUT
  handleKeyPress = (e) => {

    const changePositionX = (value) => {
      this.setState({
        coordenateX: this.state.coordenateX + value
      });
    }

    const changePositionY = (value) => {
      this.setState({
        coordenateY: this.state.coordenateY + value
      });
    }

    switch (e.keyCode) {
        // up
      case 38:
      case 87:
        changePositionX(-1);
        break;
        // right
      case 39:
      case 68:
        changePositionY(1);
        break;
        // down
      case 40:
      case 83:
        changePositionX(1);
        break;
        // left
      case 37:
      case 65:
        changePositionY(-1);
        break;
      default:
        return;
    }
  }

  // LISTEN FOR USER INPUT
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  render() {

    // HERO POSITION
    const heroPosition = this.props.gridFull;
    heroPosition[this.state.coordenateX][this.state.coordenateY] = true;

    // DRAW THE GRID
    const width = this.props.cols * 20;
    let rowsArr = [];
    let boxClass = "";
    for (let i = 0; i < this.props.rows; i++) {
      for (let j = 0; j < this.props.cols; j++) {
        let boxId = i + "_" + j;

        boxClass = heroPosition[i][j]
          ? "box on"
          : "box off";

        rowsArr.push(<Box boxClass={boxClass} key={boxId} boxId={boxId} row={i} col={j}/>)
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