import React, { Component } from 'react';
import './App.css';
import TestForm from './components/testForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <TestForm />
        </div>
      </div>
    );
  }
}

export default App;
