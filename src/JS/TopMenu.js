import React from 'react';

class TopMenu extends React.Component {

  render() {
    return (
      <div className="menuSection">

        <h4>Health:</h4>
        <p>{this.props.heroStats.health}</p>

        <h4>Weapon:</h4>
        <p>{this.props.heroStats.weapon}</p>

        <h4>Enemy:</h4>
        <p>{this.props.heroStats.enemyHealth}</p>

      </div>
    );
  }
}

export default TopMenu;