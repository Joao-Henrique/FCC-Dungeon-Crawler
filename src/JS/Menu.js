import React from 'react';

class Menu extends React.Component {

  render() {
    return (
      <div className="menuSection">

        <h4>Health:</h4>
        <p>{this.props.heroStats.health}</p>

        <h4>Weapon:</h4>
        <p>{this.props.heroStats.weapon}</p>

        <h4>Enemy:</h4>
        <p>{this.props.heroStats.enemyHealth}</p>

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

export default Menu;