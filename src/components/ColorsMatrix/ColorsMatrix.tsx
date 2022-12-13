import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useTimeMachine from '../../hooks/useTimeMachine';
import ColorsGrid from '../ColorsGrid/ColorsGrid';
import './ColorsMatrix.scss';

export default function ColorsTimeMachine(): React.ReactElement {
  const [canSelectColor, setCanSelectColor] = useState(true);

  const {
    state,
    setState,
    undo,
    redo,
    goLast,
    isUndoPossible,
    isRedoPossible,
  } = useTimeMachine('');

  function handleColorClick(color: string): void {
    if (state.present !== color) {
      setState(color);
    }
  }

  return (
    <>
      <nav className='navbar'>
        <Link to='/'>Go Home</Link>
        <Link to='/tic-tac-toe'>Go to TicTacToe</Link>
      </nav>
      <main className='main'>
        <ColorsGrid
          currentColor={state.present}
          allowColorSelect={canSelectColor}
          onColorClick={handleColorClick}
        />
        <section className='menu'>
          <button
            disabled={!isRedoPossible}
            className='menu__button'
            onClick={() => {
              redo();
              setCanSelectColor(false);
            }}>
            Next
          </button>
          <button
            className='menu__button'
            onClick={() => {
              if (isRedoPossible) {
                goLast();
              }
              setCanSelectColor(true);
            }}
            disabled={canSelectColor}>
            Resume
          </button>
          <button
            disabled={!isUndoPossible}
            className='menu__button'
            onClick={() => {
              undo();
              setCanSelectColor(false);
            }}>
            Previous
          </button>
        </section>
      </main>
    </>
  );
}
