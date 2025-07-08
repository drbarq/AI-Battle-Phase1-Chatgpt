import React from 'react';
import './SettingsPanel.css';

const levels = [
  { label: 'Easy', value: 'easy' },
  { label: 'Medium', value: 'medium' },
  { label: 'Hard', value: 'hard' },
];

function SettingsPanel({ difficulty, onChangeDifficulty, onClose }) {
  return (
    <div className="settings-overlay">
      <div className="settings-panel">
        <h2>Settings</h2>
        <div className="difficulty-options">
          {levels.map((level) => (
            <button
              key={level.value}
              className={difficulty === level.value ? 'active' : ''}
              onClick={() => onChangeDifficulty(level.value)}
            >
              {level.label}
            </button>
          ))}
        </div>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default SettingsPanel;
