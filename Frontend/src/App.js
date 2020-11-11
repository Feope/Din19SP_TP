import React, { Component } from 'react';
import Header from './components/header';
import ForumTopicContainer from './components/ForumTopicContainer';
import PictureTopicContainer from './components/PictureTopicContainer';
import Onetopic from './components/onetopic';
import './App.css';
import axios from 'axios';
import YourUserPage from './components/YourUserPage' 
import Login from './components/Login'

//const urlAddress = "https://awesome-tp.herokuapp.com/"; //url address for api Heroku
const urlAddress = "http://localhost:4000/" //url address for api Local

export default class App extends Component {
  constructor ()
  {
    super();
    this.state = 
    {
      userpage: false,
      allPosts: []
    };
  }

  componentDidMount() {
    axios.get(urlAddress + "picture_posts")
    .then((response) => {
      this.setState({allPosts: response.data})
    });
    };


  loginChange = () => {
    this.setState({ userpage: !this.state.userpage });
    console.log( this.state.userpage );
  }

  render() {

    let output = 
      <>
        <ForumTopicContainer/>
        <PictureTopicContainer allPosts={this.state.allPosts}/>
        <Onetopic/>
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
