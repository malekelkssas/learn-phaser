import { useEffect } from 'react';
import Phaser from 'phaser';
import config from './phaser';

const App = () => {

  useEffect(() => {
    const game = new Phaser.Game(config);

    return () => {
      if (game) {
        game.destroy(true);
      }
    };
  }, []);

  return null;
};

export default App;