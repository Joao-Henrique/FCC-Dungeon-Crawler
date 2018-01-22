import React from 'react';

class BottomMenu extends React.Component {

  render() {
    return (
      <div className="menuSection">

        <h4>Score:</h4>
        <p>{this.props.heroStats.score}
          XP</p>

        <h4>Level:</h4>
        <p>{this.props.heroStats.level}</p>

        <h4>Dungeon:</h4>
        <p>{this.props.heroStats.dungeon}</p>

      </div>
    );
  }
}

export default BottomMenu;