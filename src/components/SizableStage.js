import React, { Component } from 'react';
import { withSize } from 'react-sizeme';
import { Stage, Layer, Rect, Line } from 'react-konva';
import Konva from 'konva'; // idk if I need this

import './SizableStage.css';
import validateColor from '../utils/validate-color';

const rainbow = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'indigo',
  'violet',
];

class SizeableStage extends Component {
  computeBoundaryPoints = () => {
    const { size: { width }, cellWidth } = this.props;
    const split = width / cellWidth;

    const points = [0];
    for(let i = 0; i < cellWidth; i++) {
      points.push(points[points.length - 1] + split);
    }
    // make the first and last points land wholly in the grid
    points[0] = 1;
    points[points.length - 1] = width - 1;

    return points;
  };

  static defaultProps = {
    size: {
      width: 512,
    },
    color: 'black',
    strokeWidth: 1,
  };

  render() {
    const { size: {width}, lines, color, randomColor, strokeWidth } = this.props;

    const strokeColor = validateColor(color) ? color : '#000';

    return (
      <Stage height={width} width={width} className="art-board">
        <Layer>
          <Rect
            x={0}
            y={0}
            height={width}
            width={width}
            fill="#fff"
          />
        </Layer>
        {lines.length <= 0 && (
          <Layer>
            <Line points={[0, 0, width, width]} stroke="blue" strokeWidth={strokeWidth} />
            <Line points={[0, width, width, 0]} stroke="blue" strokeWidth={strokeWidth} />
            <Line points={[0, width / 2, width, width / 2]} stroke="green" strokeWidth={strokeWidth} />
            <Line points={[width / 2, 0, width / 2, width]} stroke="green" strokeWidth={strokeWidth} />
          </Layer>
        )}
        {lines.length > 0 && (
          <Layer>
            {lines.map(({start, end}, idx) => {
              const rainbowStroke = rainbow[Math.floor(Math.random() * rainbow.length)];
              return (
                <Line
                  key={idx}
                  points={[start.x, start.y, end.x, end.y]}
                  stroke={randomColor ? rainbowStroke : strokeColor}
                  strokeWidth={strokeWidth}
                  lineCap="miter"
                />
              );
            })}
          </Layer>
        )}
      </Stage>
    );
  }
}

export default withSize()(SizeableStage);
