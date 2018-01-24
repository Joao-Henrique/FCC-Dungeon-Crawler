import React from 'react';

function ProjectDescription() {
  return (
    <div>
      <h2>Project description:</h2>
      <h5>The Roguelike Dungeon Crawler Game is a Project made for &nbsp;
        <a href="https://www.freecodecamp.org/" target="blank">
          FreeCodeCamp's
        </a>
        &nbsp; Data Visualization Certification using React and React-Bootstrap. You can
        play the game using the arrow keys. To interact with the items just press the key in their direction, several times in the case of enemies. You have health, a level, and a weapon. You can pick up better weapons, health packs and XP coins. All the items and enemies on the map are arranged at random. When you fight an enemy, you take turns damaging each other until one of you loses. You do damage based off of your level and your weapon. The enemy does damage based off of its level. Damage is somewhat random within a range. You can advance to next dungeon using the the purple portal in the end of each dungeon. When you find and beat the boss on dungeon nº 4, you win. Good Luck!
      </h5>
      <h2>Project date:</h2>
      <h5>December 2018</h5>
    </div>
  )
}
export default ProjectDescription;