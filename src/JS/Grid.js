import React, {Component} from 'react';
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
            switch (this.props.weaponDamage) {
              case 1:
                boxClass = "box hero1";
                break;
              case 2:
                boxClass = "box hero2";
                break;
              case 3:
                boxClass = "box hero3";
                break;
              case 4:
                boxClass = "box hero4";
                break;
              default:
                boxClass = "box hero5";
            };
            break;
          case "2":
            switch (this.props.dungeon) {
              case 1:
                boxClass = "box enemy1";
                break;
              case 2:
                boxClass = "box enemy2";
                break;
              case 3:
                boxClass = "box enemy3";
                break;
              default:
                boxClass = "box enemy4";
            };
            break;
          case "3":
            boxClass = "box boss";
            break;
          case "5":
            boxClass = "box weapon";
            break;
          case "6":
            boxClass = "box xp";
            break;
          case "7":
            boxClass = "box health";
            break;
          case "8":
            boxClass = "box portal";
            break;
          case "9":
            switch (this.props.dungeon) {
              case 1:
                boxClass = "box wall1";
                break;
              case 2:
                boxClass = "box wall2";
                break;
              case 3:
                boxClass = "box wall3";
                break;
              default:
                boxClass = "box wall4";
            };
            break;
          default:
            switch (this.props.dungeon) {
              case 1:
                boxClass = "box floor1";
                break;
              case 2:
                boxClass = "box floor2";
                break;
              case 3:
                boxClass = "box floor3";
                break;
              default:
                boxClass = "box floor4";
            };
        }

        // UPDATE BOX PROPERTIES
        rowsArr.push(<Box
          boxClass={boxClass}
          key={boxId}
          boxId={boxId}
          row={i}
          col={j}
          boxPosition={boxPosition}
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