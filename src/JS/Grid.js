import React from 'react';
import Box from './Box';

class Grid extends React.Component {
  render() {

    /* //LISTEN FOR USER INPUT
    window.addEventListener("keypress", this.handleKeyPress); */

    //HERO INITIAL POSITIONING
    const heroPosition = this.props.gridFull;
    let coordenateX = 1;
    let coordenateY = 1;
    heroPosition[coordenateX][coordenateY] = true;

    //FUNCTION TO RECIEVE USER INPUT
    const handleKeyPress = (event) => {
      if (event.keyCode === 39) {
        //left
        coordenateX--;
      }
      if (event.keyCode === 37) {
        //right
        coordenateX++;
      }
      if (event.keyCode === 38) {
        //up
        coordenateY--;
      }
      if (event.keyCode === 40) {
        //down
        coordenateY++;
      }
    }

    //

    //DRAW THE GRID
    const width = this.props.cols * 20;
    let rowsArr = [];
    let boxClass = "";
    for (let i = 0; i < this.props.rows; i++) {
      for (let j = 0; j < this.props.cols; j++) {
        let boxId = i + "_" + j;
        boxClass = heroPosition[i][j]
          ? "box on"
          : "box off";
        rowsArr.push(<Box
          boxClass={boxClass}
          key={boxId}
          boxId={boxId}
          row={i}
          col={j}
          selectBox={this.props.selectBox}/>)
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