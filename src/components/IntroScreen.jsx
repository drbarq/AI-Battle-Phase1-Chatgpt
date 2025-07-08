import React from 'react';
import './IntroScreen.css';

function IntroScreen({ onStart, onSettings }) {
  return (
    <div className="intro-screen">
      <a
        href="https://www.tiktok.com/@vibinwiththechef"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/Images/logo.png"
          alt="Vibin With The Chef TikTok"
          className="logo"
        />
      </a>
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
