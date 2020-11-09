import React, { Component } from 'react';
import Header from './components/header';
import ForumTopicContainer from './components/ForumTopicContainer'
import './App.css'; 
import User from './components/User'

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
        <div><User/></div>
      </div>
    )
  }
}
