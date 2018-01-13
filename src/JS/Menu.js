import React from 'react';

class Menu extends React.Component {

  render() {
    return (
      <div className="menuSection">

        <h4>Health:</h4>
        <p>{this.props.heroStats.health}</p>

        <h4>Weapon:</h4>
        <p>{this.props.heroStats.weapon}</p>

        <h4>Atack:</h4>
        <p>{this.props.heroStats.atack}</p>

        <h4>Next Level:</h4>
        <p>{this.props.heroStats.xp}
          XP</p>

        <h4>Dungeon:</h4>
        <p>{this.props.heroStats.dungeon}</p>

      </div>
    );
  }
}

export default Menu;