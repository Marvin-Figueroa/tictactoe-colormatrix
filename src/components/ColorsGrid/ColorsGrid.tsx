import React from 'react';
import Color from '../Color/Color';
import './ColorsGrid.scss';

enum Colors {
  Limegreen = '#32cd32',
  Crimson = '#dc143c',
  Dodgerblue = '#1e90ff',
  Gold = '#ffd700',
  Orange = '#ffa500',
  Darkorchid = '#9932cc',
  Darkturquoise = '#00ced1',
  Green = '#008000',
  Tomato = '#ff6347',
  Deeppink = '#ff1493',
  Gainsboro = '#dcdcdc',
  RoseWood = '#4f000b',
  Black = '#000',
  Lightblue = '#add8e6',
  Olive = '#808000',
  AppleGreen = '#7cb518',
}

interface IProps {
  currentColor: string | undefined;
  onColorClick: (color: string) => void;
  allowColorSelect: boolean;
}

export default function ColorsGrid({
  currentColor,
  onColorClick,
  allowColorSelect,
}: IProps): React.ReactElement {
  return (
    <section className='colors-grid'>
      {Object.values(Colors).map((color) => (
        <Color
          currentColor={currentColor}
          allowColorSelect={allowColorSelect}
          key={color}
          color={color}
          onColorClick={onColorClick}
        />
      ))}
    </section>
  );
}
