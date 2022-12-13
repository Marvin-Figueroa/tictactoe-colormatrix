import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useTimeMachine from '../../../hooks/useTimeMachine';
import { calculateWinner } from '../../../utils/helpers';
import Board from '../Board/Board';
import Confetti from 'react-confetti';
import './Game.scss';

export default function Game(): React.ReactElement {
  const [xIsNext, setXIsNext] = useState(true);
  const [keepPlaying, setKeepPlaying] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isReplaying, setIsReplaying] = useState(false);

  const {
    state,
    setState,
    undo,
    redo,
    goFirst,
    goLast,
    clear,
    isUndoPossible,
    isRedoPossible,
  } = useTimeMachine<Array<string | null>>(Array(9).fill(null));

  const undoRef = useRef(isRedoPossible);
  undoRef.current = isRedoPossible;

  useEffect(() => {
    if (calculateWinner(state.present) !== null) {
      setHasWon(true);
      setGameOver(true);
    }

    if (state.past.length >= 9) {
      setGameOver(true);
    }
  }, [state.present]);

  function handleClick(square: number): void {
    const latestMove = state.present;
    const squares = [...latestMove];
    setGameStarted(true);

    if (hasWon || gameOver) {
      return;
    }

    squares[square] = xIsNext ? 'X' : 'O';
    setState(squares);
    setXIsNext(!xIsNext);
  }

  function replayGame(): void {
    goFirst();
    setIsReplaying(true);

    const timer = window.setInterval(() => {
      if (!undoRef.current) {
        clearInterval(timer);
        setIsReplaying(false);
      } else {
        redo();
      }
    }, 500);
  }

  return (
    <>
      {hasWon && <Confetti />}
      <nav className='navbar'>
        <Link to='/'>Go Home</Link>
        <Link to='/colors-matrix'>Go to ColorsMatrix</Link>
      </nav>
      <main className='game-container'>
        <Board
          keepPlaying={keepPlaying}
          squares={state.present}
          onClick={handleClick}
        />
        <aside className='sidebar-buttons'>
          <button
            disabled={!isRedoPossible || isReplaying}
            onClick={() => {
              redo();
              setKeepPlaying(false);
            }}
            className='btn'>
            Next
          </button>
          {(hasWon || gameOver) && keepPlaying ? (
            <button disabled={isReplaying} className='btn' onClick={replayGame}>
              Replay
            </button>
          ) : (
            <button
              disabled={keepPlaying}
              onClick={() => {
                if (isRedoPossible) {
                  goLast();
                }
                setKeepPlaying(true);
              }}
              className='btn'>
              Resume
            </button>
          )}
          <button
            disabled={!isUndoPossible || isReplaying}
            onClick={() => {
              undo();
              setKeepPlaying(false);
            }}
            className='btn'>
            Previous
          </button>

          <div className='next-player'>
            <p>Next to Move</p>
            <div className='next-player__tag'>{xIsNext ? 'X' : 'O'}</div>
          </div>
          <button
            disabled={!gameStarted}
            onClick={() => {
              clear(Array(9).fill(null));
              setKeepPlaying(true);
              setGameStarted(false);
              setXIsNext(true);
              setHasWon(false);
              setGameOver(false);
            }}
            className='btn btn-restart'>
            Restart
          </button>
        </aside>
      </main>
    </>
  );
}
