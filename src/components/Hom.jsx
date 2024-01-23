"use client"

import { useEffect, useState } from 'react';
import './home.css';

const SpeedTypingGame = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(10);

  useEffect(() => {
    focusOnTextInput();
    startCountdown();
    addWordToDOM();
  }, []);

  const words = [
    'sigh', 'tense', 'airplane', 'ball', 'pies', 'juice', 'warlike', 'bad',
    'north', 'dependent', 'steer', 'silver', 'highfalutin', 'superficial',
    'quince', 'eight', 'feeble', 'admit', 'drag', 'loving'
  ];

  const focusOnTextInput = () => {
    document.getElementById('textInput').focus();
  };

  const startCountdown = () => {
    const timeInterval = setInterval(() => {
      updateTime();
    }, 1000);

    return () => clearInterval(timeInterval);
  };

  const getRandomWord = () => {
    return words[Math.floor(Math.random() * words.length)];
  };

  const addWordToDOM = () => {
    const word = getRandomWord();
    setCurrentWord(word);
  };

  const updateScore = () => {
    setScore(score + 1);
  };

  const updateTime = () => {
    setTime((prevTime) => {
      if (prevTime === 0) {
        // end game
        gameOver();
        return prevTime;
      }
      return prevTime - 1;
    });
  };

  const gameOver = () => {
    const endgameContainer = document.getElementById('endgameContainer');
    endgameContainer.innerHTML = `
      <h1>Time ran out</h1>
      <p>Your final score is ${score}</p>
      <button onclick="location.reload()">Reload</button>
    `;

    endgameContainer.style.display = 'flex';
  };

  const handleInputChange = (e) => {
    const insertedText = e.target.value;

    if (insertedText === currentWord) {
      addWordToDOM();
      updateScore();
      e.target.value = '';

      setTime((prevTime) => {
        if (prevTime === 0) {
        
          gameOver();
          return prevTime;
        }

        return prevTime + 2;
      });
    }
  };

  return (
    <div className='gameContainer'>
      <h2>Speed Typing Game</h2>
      <small>Type the following:</small>
      <h1 id='word'>{currentWord}</h1>
      <input
        type='text'
        id='textInput'
        autoComplete='off'
        placeholder='Type the word here'
        autoFocus
        onChange={handleInputChange}
      />
      <p className='timeContainer'>Time left: <span id='time'>{time}s</span></p>
      <p className='scoreContainer'>Score: <span id='score'>{score}</span></p>
      <div id='endgameContainer' className='endgameContainer'></div>
    </div>
  );
};

export default SpeedTypingGame;