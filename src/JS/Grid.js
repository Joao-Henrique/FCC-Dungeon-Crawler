import React, {Component} from 'react';
import Box from './Box';

class Grid extends Component {

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
          case "heroCell":
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