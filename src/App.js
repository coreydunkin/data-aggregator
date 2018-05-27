import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';



class App extends Component {



  render() {

  const inputTempData = [{"id":"a","timestamp":1509493641,"temperature":3.53},{"id":"b","timestamp":1509493642,"temperature":4.13},{"id":"c","timestamp":1509493643,"temperature":3.96},{"id":"a","timestamp":1509493644,"temperature":3.63},{"id":"c","timestamp":1509493645,"temperature":3.96},{"id":"a","timestamp":1509493645,"temperature":4.63},{"id":"a","timestamp":1509493646,"temperature":3.53},{"id":"b","timestamp":1509493647,"temperature":4.15},{"id":"c","timestamp":1509493655,"temperature":3.95},{"id":"a","timestamp":1509493677,"temperature":3.66},{"id":"b","timestamp":1510113646,"temperature":4.15},{"id":"c","timestamp":1510127886,"temperature":3.36},{"id":"c","timestamp":1510127892,"temperature":3.36},{"id":"a","timestamp":1510128112,"temperature":3.67},{"id":"b","timestamp":1510128115,"temperature":3.88}];

  const listItems = inputTempData.map((inputTempData) =>
    {inputTempData}
  );

  const ouputTempData = [{"id":"c","average":3.72,"median":3.95,"mode":[3.36,3.96]},{"id":"a","average":3.78,"median":3.65,"mode":[3.53]},{"id":"b","average":4.08,"median":4.14,"mode":[4.15]}];
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Data aggregator</h1>
        </header>
        <p>
        We are collecting temperature data about fridges in a supermarket. Imagine we have data fromdifferent fridge sensors aggregated into a single JSON array (where an individual sensor is identifiedby an id)
        </p>
        <p>
          Create an application that outputs the average, median and mode temperature for each fridgesensor to 2 decimal places in the following JSON format
        </p>

        {listItems}
      </div>
    );
  }
}

export default App;
