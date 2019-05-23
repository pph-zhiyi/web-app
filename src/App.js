import React, { Component } from 'react';
import './App.css';
import Router from './router/Router'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Router />
      </div>
    );
  }
}