import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useTimeMachine from '../../../hooks/useTimeMachine';
import { calculateWinner } from '../../../utils/helpers';
import Board from '../Board/Board';
import Confetti from 'react-confetti';
import './Game.scss';

export default function Game(): React.ReactElement {
  const [xIsNext, setXIsNext] = useState(true);
  const [hasWon, setHasWon] = useState(false);
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

  const gameStarted = state.past.length > 0;
  const keepPlaying = state.future.length === 0;
  const gameOver = state.past.length >= 9;

  useEffect(() => {
    if (calculateWinner(state.present) !== null) {
      setHasWon(true);
    }
  }, [state.present]);

  function handleClick(square: number): void {
    const latestMove = state.present;
    const squares = [...latestMove];

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
  }

  useEffect(() => {
    if (!isReplaying) return;
    let counter = state.future.length;
    const timer = window.setInterval(() => {
      if (isRedoPossible) {
        if (counter <= 0) {
          clearInterval(timer);
          setIsReplaying(false);
          return;
        }
        counter--;
        redo();
      } else {
        clearInterval(timer);
        setIsReplaying(false);
      }
    }, 500);
  }, [isReplaying, isRedoPossible]);
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
              }}
              className='btn'>
              Resume
            </button>
          )}
          <button
            disabled={!isUndoPossible || isReplaying}
            onClick={() => {
              undo();
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
              setXIsNext(true);
              setHasWon(false);
            }}
            className='btn btn-restart'>
            Restart
          </button>
        </aside>
      </main>
    </>
  );
}
