import React from 'react';
import './IntroScreen.css';

function IntroScreen({ onStart, onSettings }) {
  return (
    <div className="intro-screen">
      <h1>Snake</h1>
      <button
        className="start-button"
        onClick={() => {
          onStart();
          navigator.vibrate?.(50);
        }}
      >
        Start Game
      </button>
      <button className="settings-button" onClick={onSettings}>
        Settings
      </button>
    </div>
  );
}

export default IntroScreen;
