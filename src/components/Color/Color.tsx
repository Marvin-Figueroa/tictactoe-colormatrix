import React from 'react';
import './Color.scss';

interface Props {
  currentColor: string | undefined;
  color: string;
  onColorClick: (color: string) => void;
  allowColorSelect: boolean;
}

export default function Color({
  currentColor,
  color,
  onColorClick,
  allowColorSelect,
}: Props): React.ReactElement {
  return (
    <button
      disabled={!allowColorSelect}
      onClick={() => onColorClick(color)}
      style={{
        backgroundColor: color,
        opacity: color === currentColor ? 1 : 0.5,
      }}
      className={`color-item ${color === currentColor ? 'current' : ''}`}
    ></button>
  );
}
