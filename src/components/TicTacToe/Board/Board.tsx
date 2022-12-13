import React from 'react';
import Square from '../Square/Square';
import './Board.scss';

interface Props {
  squares: Array<string | null>;
  onClick: (value: number) => void;
  keepPlaying: boolean;
}

export default function Board({
  squares,
  onClick,
  keepPlaying,
}: Props): React.ReactElement {
  return (
    <div className='board'>
      {squares.map((square, index) => (
        <Square
          keepPlaying={keepPlaying}
          key={index}
          value={square}
          onClick={() => onClick(index)}
        />
      ))}
    </div>
  );
}
