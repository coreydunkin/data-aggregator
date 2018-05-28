import React, { Component } from 'react';
import './App.css';
import tempData from './tempData.json';

class App extends Component {


  render() {

  // simple math round function to help round to 2 decimal places
  const round = value => Math.round(value * 100) / 100;

  // sort objects into groups of ID's to break down
  const group = (list, key) => {
    return list.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  const groupedByID = group(tempData, 'id');

  // place them into a new array
  const newGroupArray = []

  // setup output data  
  let outputData = [];

  // push each grouped array into an array for counting
  newGroupArray.push(groupedByID.a, groupedByID.b, groupedByID.c);

  // calculate over the average, median and mode
  // do this for each unique ID (in this case 3)
  const times = n => f => {
    let iter = i => {
      if (i === n) return
      f (i)
      iter (i + 1)
    }
    return iter (0)
  }

  // this function will run as many times as there are id's
  times (newGroupArray.length) (i => {

    // Calculate the average
    const calculateAverage = Array.from(newGroupArray[i].reduce(
      (acc, obj) => Object.keys(obj).reduce( 
          (acc, key) => typeof obj[key] === "number"
              ? acc.set(key, (acc.get(key) || []).concat(obj[key]))
              : acc,
      acc),
      new Map()), 
        ([name, values]) =>
            ({ name, average: values.reduce( (a,b) => a+b ) / values.length})
      
    );

    // Round off the average and store
    const average = round(calculateAverage[1].average);

    // Calculate the median
    const calculateMedian = (values) => {
      values.sort(function(a,b){
        return a-b;
      });
      let half = Math.floor(values.length / 2);
      
      if (values.length % 2)
        return values[half];
      else
        return (values[half - 1] + values[half]) / 2.0;
    }
    
    // Sort the median and round off
    const unRoundedMedian = calculateMedian(newGroupArray[i].map( x => x.temperature));
    const median = round(unRoundedMedian);
    
    // Calculate the mode
    const calculateMode = (array) => {
      if (array.length === 0)
          return null;
      var modeMap = {},
          maxCount = 1, 
          modes = [array[0]];

      for(var i = 0; i < array.length; i++)
      {
          var el = array[i];

          if (modeMap[el] == null)
              modeMap[el] = 1;
          else
              modeMap[el]++;

          if (modeMap[el] > maxCount)
          {
              modes = [el];
              maxCount = modeMap[el];
          }
          else if (modeMap[el] === maxCount)
          {
              modes.push(el);
              maxCount = modeMap[el];
          }
      }
      return modes;
    }
    // Sort the mode and store
    const mode = calculateMode(newGroupArray[i].map( x => x.temperature));

    // Sort ID's
    const ids = newGroupArray[i].map( x => x.id);
    // Clean out duplicate ID's from array
    const idArray = ids.filter(function(el) {
      // If it is not a duplicate, return true
      if (ids.indexOf(el.ID) === -1) {
        
        ids.push(el.ID);
        return true;
      }
    
      return false;
      
    });
    // Remove array brackets
    const id = idArray.join(",");

    // Generate the newly formated JSON array :)
    outputData.push({"id": id, "average":average, "median":median, "mode":mode});

    // Lastly, let's reorder the data based on averages in descending order
    function compare(a,b) {
      if (a.average < b.average)
        return -1;
      if (a.average > b.average)
        return 1;
      return 0;
    }
    
    outputData.sort(compare);
    return outputData;
  });

  const stringifyOutputData = JSON.stringify(outputData);

  // Leaving these console logs to show they work :)
  console.log('Thanks for viewing the outputted code! :)');
  console.log(outputData);
  console.log(stringifyOutputData);
 



    return (

      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Data aggregator</h1>
        </header>
        <p>Data outputs to HTML</p>
        <p>
          Create an application that outputs the average, median and mode temperature for each fridgesensor to 2 decimal places in the following JSON format
        </p> 
        <div className="json">
          {stringifyOutputData}
        </div>
      </div>
    );
  }
}

export default App;
