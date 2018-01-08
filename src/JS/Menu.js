import React from 'react';

class Menu extends React.Component {

  render() {
    return (
      <div class="row">
        <div class="row">
          <h4>Health:</h4>
          <p>100</p>
        </div>
        <div class="row">
          <h4>Weapon:</h4>
          <p>Stick</p>
        </div>
        <div class="row">
          <h4>Atack:</h4>
          <p>7</p>
        </div>
        <div class="row">
          <h4>Level:</h4>
          <p>1</p>
        </div>
        <div class="row">
          <h4>Next Level:</h4>
          <p>60 XP</p>
        </div>
        <div class="row">
          <h4>Dungeon:</h4>
          <p>1</p>
        </div>
      </div>
    );
  }
}

export default Menu;