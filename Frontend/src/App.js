import React, { Component } from 'react';
import Header from './components/header';
import ForumTopicContainer from './components/ForumTopicContainer';
import PictureTopicContainer from './components/PictureTopicContainer';
import Onetopic from './components/onetopic';
import './App.css';
import axios from 'axios';
//const urlAddress = "https://awesome-tp.herokuapp.com/"; //url address for api Heroku
const urlAddress = "http://localhost:3000/" //url address for api Local
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
      allPosts: []
    };
  }

  componentDidMount() {
    axios.get(urlAddress + "picture_posts")
    .then((response) => {
      this.setState({allPosts: response.data})
      console.log(response.data);
    });
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
