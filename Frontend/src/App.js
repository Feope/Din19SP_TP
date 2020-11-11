import React, { Component } from 'react';
import Header from './components/header';
import ForumTopicContainer from './components/ForumTopicContainer'
import YourUserPage from './components/YourUserPage'
import './App.css'; 
import Login from './components/Login'

export default class App extends Component {
  constructor ()
  {
    super();
    this.state = 
    {
      userpage: false,
      test: null
    };
  }

  loginChange = () => {
    this.setState({ userpage: !this.state.userpage });
    console.log( this.state.userpage );
  }

  render() {

    let output = 
      <>
        <ForumTopicContainer/>
      </>

    if(this.state.userpage === true){
      output = 
      <>
        <YourUserPage/>
      </>
    }

    return (  
      <div className="appContainer">
        <Header  userChange={this.loginChange}/>
        { output }
        <div><Login/></div>
      </div>
    )
  }
}
