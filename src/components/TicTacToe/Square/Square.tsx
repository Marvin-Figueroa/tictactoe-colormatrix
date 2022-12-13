import React from 'react';
import './Square.scss';

interface Props {
  value: string | null;
  onClick: () => void;
  keepPlaying: boolean;
}

export default function Square({
  onClick,
  value,
  keepPlaying,
}: Props): React.ReactElement {
  return (
    <button disabled={!keepPlaying} className='square' onClick={onClick}>
      {value}
    </button>
  );
}
