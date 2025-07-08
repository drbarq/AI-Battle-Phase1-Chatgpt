import React, { useState } from 'react';
import IntroScreen from './components/IntroScreen';
import SettingsPanel from './components/SettingsPanel';
import Game from './components/Game';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');

  const startGame = () => {
    setShowIntro(false);
  };

  const openSettings = () => {
    setShowSettings(true);
    navigator.vibrate?.(20);
  };

  const closeSettings = () => {
    setShowSettings(false);
  };

  const changeDifficulty = (level) => {
    setDifficulty(level);
    navigator.vibrate?.(20);
  };

  return (
    <>
      {showIntro && <IntroScreen onStart={startGame} onSettings={openSettings} />}
      {showSettings && (
        <SettingsPanel
          difficulty={difficulty}
          onChangeDifficulty={changeDifficulty}
          onClose={closeSettings}
        />
      )}
      {!showIntro && <Game difficulty={difficulty} onOpenSettings={openSettings} />}
    </>
  );
}

export default App;
