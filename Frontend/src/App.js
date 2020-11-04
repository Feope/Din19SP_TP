import React, { Component } from 'react';
import Header from './components/header';
import ForumTopicContainer from './components/ForumTopicContainer'
import './App.css'; 

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
        <ForumTopicContainer/>
      </div>
    )
  }
}
