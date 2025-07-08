import React, { useState, useEffect, useRef } from 'react';
import Joystick from './Joystick';
import './Game.css';

const GRID_WIDTH = 15;
const GRID_HEIGHT = 17;

const SPEED_MAP = {
  easy: 200,
  medium: 150,
  hard: 100,
};

function getRandomPosition(snake) {
  let position;
  do {
    position = {
      x: Math.floor(Math.random() * GRID_WIDTH),
      y: Math.floor(Math.random() * GRID_HEIGHT),
    };
  } while (snake.some((seg) => seg.x === position.x && seg.y === position.y));
  return position;
}

function Game({ difficulty, onOpenSettings }) {
  const [snake, setSnake] = useState([
    { x: Math.floor(GRID_WIDTH / 2) - 1, y: Math.floor(GRID_HEIGHT / 2) },
    { x: Math.floor(GRID_WIDTH / 2), y: Math.floor(GRID_HEIGHT / 2) },
    { x: Math.floor(GRID_WIDTH / 2) + 1, y: Math.floor(GRID_HEIGHT / 2) },
  ]);
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [food, setFood] = useState(getRandomPosition(snake));
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (gameOver) return;
    const speed = SPEED_MAP[difficulty] || SPEED_MAP.medium;
    intervalRef.current = setInterval(() => {
      setSnake((prev) => {
        const newHead = {
          x: (prev[prev.length - 1].x + direction.x + GRID_WIDTH) % GRID_WIDTH,
          y: (prev[prev.length - 1].y + direction.y + GRID_HEIGHT) % GRID_HEIGHT,
        };
        if (prev.some((seg) => seg.x === newHead.x && seg.y === newHead.y)) {
          setGameOver(true);
          navigator.vibrate?.(100);
          return prev;
        }
        const newSnake = [...prev, newHead];
        if (newHead.x === food.x && newHead.y === food.y) {
          setFood(getRandomPosition(newSnake));
          setScore((s) => s + 1);
          navigator.vibrate?.(50);
          return newSnake;
        }
        newSnake.shift();
        return newSnake;
      });
    }, speed);
    return () => clearInterval(intervalRef.current);
  }, [direction, food, difficulty, gameOver]);

  const handleDirectionChange = (dir) => {
    if (dir.x + direction.x === 0 && dir.y + direction.y === 0) return;
    setDirection(dir);
    navigator.vibrate?.(20);
  };

  const handleRestart = () => {
    setSnake([
      { x: Math.floor(GRID_WIDTH / 2) - 1, y: Math.floor(GRID_HEIGHT / 2) },
      { x: Math.floor(GRID_WIDTH / 2), y: Math.floor(GRID_HEIGHT / 2) },
      { x: Math.floor(GRID_WIDTH / 2) + 1, y: Math.floor(GRID_HEIGHT / 2) },
    ]);
    setDirection({ x: 1, y: 0 });
    setFood(getRandomPosition(snake));
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="game-container">
      <div className="score">Score: {score}</div>
      <button className="settings-btn" onClick={onOpenSettings}>⚙️</button>
      <div
        className="game-grid"
        style={{
          gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_HEIGHT}, 1fr)`,
        }}
      >
        {[...Array(GRID_WIDTH * GRID_HEIGHT)].map((_, idx) => {
          const x = idx % GRID_WIDTH;
          const y = Math.floor(idx / GRID_WIDTH);
          const isSnake = snake.some((seg) => seg.x === x && seg.y === y);
          const isHead = snake[snake.length - 1].x === x && snake[snake.length - 1].y === y;
          const isFood = food.x === x && food.y === y;
          return (
            <div
              className={`cell ${isSnake ? 'snake' : ''} ${isHead ? 'head' : ''} ${
                isFood ? 'food' : ''
              }`}
              key={idx}
            />
          );
        })}
      </div>
      {gameOver && (
        <div className="game-over">
          <div>Game Over</div>
          <div>Score: {score}</div>
          <button onClick={handleRestart}>Restart</button>
        </div>
      )}
      <Joystick onDirection={handleDirectionChange} />
    </div>
  );
}

export default Game;
