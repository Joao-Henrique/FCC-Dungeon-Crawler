import React from 'react';
import Box from './Box';

class Grid extends React.Component {

  // LISTEN FOR USER INPUT
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  // MOVE HERO BASED ON USER INPUT
  handleKeyPress(e) {
    console.log(this.heroPosition);
    console.log(this.coordenateX);
    console.log(this.coordenateY);
    switch (e.keyCode) {
        // up
      case 38:
      case 87:
        this.coordenateY--;
        break;
        // right
      case 39:
      case 68:
        this.coordenateX++;
        break;
        // down
      case 40:
      case 83:
        this.coordenateY++;
        break;
        // left
      case 37:
      case 65:
        this.coordenateX--;
        break;
      default:
        return;
    }
  }

  render() {

    // HERO INITIAL POSITIONING
    const heroPosition = this.props.gridFull;
    let coordenateX = 1;
    let coordenateY = 1;
    heroPosition[coordenateX][coordenateY] = true;

    //

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