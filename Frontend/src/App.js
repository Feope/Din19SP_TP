import React, { Component } from 'react';
import Header from './components/header';
import ForumTopicContainer from './components/ForumTopicContainer'
import './App.css'; 
import Login from './components/Login'

export default class App extends Component {
  constructor ()
  {
    super();
    this.state = 
    {
      test: null
    };
  }

  render() {
    return (
      <div className="appContainer">
        <div><Header/></div>
        <div><ForumTopicContainer/></div>
        <div><Login/></div>
      </div>
    )
  }
}
