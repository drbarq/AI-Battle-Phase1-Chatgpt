import React from 'react';
import './Joystick.css';

function Joystick({ onDirection }) {
  return (
    <div className="joystick">
      <button className="btn up" onClick={() => onDirection({ x: 0, y: -1 })}>
        ↑
      </button>
      <button className="btn left" onClick={() => onDirection({ x: -1, y: 0 })}>
        ←
      </button>
      <button className="btn right" onClick={() => onDirection({ x: 1, y: 0 })}>
        →
      </button>
      <button className="btn down" onClick={() => onDirection({ x: 0, y: 1 })}>
        ↓
      </button>
    </div>
  );
}

export default Joystick;
