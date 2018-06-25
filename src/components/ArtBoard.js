import React, { Component } from 'react';
import { SizeMe } from 'react-sizeme';
import Konva from 'konva';
import { Stage, Layer, Rect, } from 'react-konva';

import SizableStage from './SizableStage';
import shuffle from '../utils/shuffle';
import './ArtBoard.css';

class ArtBoard extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      cells: 5,
      color: 'black',
      thickness: 1,
      randomColor: false,
      lines: [],
      size: {
        width: 512,
      },
    };
  };

  computeBoundaryPoints = () => {
    const { cells, size: { width } } = this.state;
    const split = width / cells;

    const points = [0];
    for(let i = 0; i < cells; i++) {
      points.push(points[points.length - 1] + split);
    }
    // make the first and last points land wholly in the grid
    points[0] = 1;
    points[points.length - 1] = width - 1;

    return points;
  };

  computeRandomCells = () => {
    const { cells } = this.state;
    const boundaryPoints = this.computeBoundaryPoints();
    return Array.from(Array(cells * cells), (_, i) => {
      const x = i % cells;
      const y = Math.floor(i / cells);
      const x0 = boundaryPoints[x];
      const x1 = boundaryPoints[x + 1];
      const y0 = boundaryPoints[y];
      const y1 = boundaryPoints[y + 1];
      const drawPoints = {
        topLeft: {x: Math.floor(x0), y: Math.floor(y0)},
        topRight: {x: Math.floor(x1), y: Math.floor(y0)},
        bottomLeft: {x: Math.floor(x0), y: Math.floor(y1)},
        bottomRight: {x: Math.floor(x1), y: Math.floor(y1)},
      };
      const [first, second] = shuffle(Object.keys(drawPoints));
      const start = drawPoints[first];
      const end = drawPoints[second];

      return {start, end};
    });
  };

  generateLines = () => {
    this.setState({lines: this.computeRandomCells()});
  };

  render() {
    const { cells, color, thickness, randomColor, lines, size } = this.state;
    console.log(randomColor);
    return (
      <div>
        <label for="cells">
          How many cells wide?
          {' '}
          <input
            id="cells"
            type="number"
            step="1"
            value={cells}
            onChange={e => this.setState({cells: e.target.value}, this.generateLines)}
          />
        </label>
        <label for="color">
          What color?
          {' '}
          <input
            id="color"
            type="string"
            value={color}
            onChange={e => this.setState({color: e.target.value})}
          />
        </label>
        <label for="thickness">
          Line Thicknes?
          {' '}
          <input
            id="thickness"
            type="number"
            value={thickness}
            onChange={e => this.setState({thickness: e.target.value})}
          />
        </label>
        <label for="randomColor">
          Rainbow Segments?
          {' '}
          <input
            id="randomColor"
            type="checkbox"
            value={randomColor}
            onChange={() => this.setState(({randomColor}) => ({randomColor: !randomColor}))}
          />
        </label>
        <button onClick={this.generateLines}>Make some art!</button>
        <div className="art-board-container">
          <SizableStage
            onSize={(size) => this.setState({size})}
            cellWidth={cells}
            color={color}
            randomColor={randomColor}
            lines={lines}
            size={size}
            strokeWidth={thickness}
          />
        </div>
     </div>
    );
  }
}

export default ArtBoard;
