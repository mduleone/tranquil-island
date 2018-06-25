import React, { Component } from 'react';

import ArtBoard from './components/ArtBoard';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
      {/*<img src={logo} className="App-logo" alt="logo" />*/}
          <h2>Generated Art!</h2>
        </div>
        <p className="App-intro">
          Inspired (implementation and idea) by a lightning talk at <a href="https://manhattanjs.com">ManhattanJS</a> from <a href="https://twitter.com/twholman">Tim Holman</a> about generative art, and then again inspired to sit down and play with things by a talk on GPU generated art by
          {' '}
          <a href="https://twitter.com/MaxBittker">
            Max Bittker
          </a>
          {' '}
          at
          {' '}
          <a href="https://dinosaurjs.org">
            DinosaurJS
          </a>
          .
        </p>
        <ArtBoard />  
      </div>
    );
  }
}

export default App;
