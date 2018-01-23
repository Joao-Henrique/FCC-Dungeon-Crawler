import React, { Component } from 'react';
import Box from './Box';

class Grid extends Component {

  render() {

    // DRAW THE GRID
    const width = this.props.cols * 40;
    let rowsArr = [];
    let boxClass = "";
    for (let i = 0; i < this.props.rows; i++) {
      for (let j = 0; j < this.props.cols; j++) {
        const boxId = i + "_" + j;
        const boxPosition = this.props.gameBoard[i][j];

        // VERIFY CONDITIONS BASED ON STATE TO UPDATE
        switch (boxPosition) {
          case "1":
            (boxClass = "box hero");
            break;
          case "2":
            (boxClass = "box enemy");
            break;
          case "3":
            (boxClass = "box boss");
            break;
          case "5":
            (boxClass = "box weapon");
            break;
          case "6":
            (boxClass = "box xp");
            { <p>xp</p> };
            break;
          case "7":
            (boxClass = "box health");
            break;
          case "8":
            (boxClass = "box portal");
            break;
          case "9":
            (boxClass = "box wall");
            break;
          default:
            (boxClass = "box floor");
            break;
        }

        // WILL TRY SOMETHING NEW HERE TOMOROW
        /* switch (boxPosition) {
          case
        } */

        // UPDATE BOX PROPERTIES
        rowsArr.push(<Box
          boxClass={boxClass}
          key={boxId}
          boxId={boxId}
          row={i}
          col={j}
          boxPosition={boxPosition}
          selectBox={this.props.selectBox} />)
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