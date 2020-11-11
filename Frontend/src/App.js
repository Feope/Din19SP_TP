import React, { Component } from 'react';
import Header from './components/header';
import ForumTopicContainer from './components/ForumTopicContainer'
import Onetopic from './components/onetopic'
import './App.css';
import axios from 'axios';
//const urlAddress = "https://awesome-tp.herokuapp.com/"; //url address for api Heroku
const urlAddress = "http://localhost:3000/" //url address for api Local

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
    axios.get(urlAddress + "items")
    .then((response) => {
      this.setState({allPosts: response.data})
      console.log(response.data);
    });
  }

  render() {
    return (
      <div className="appContainer">
        <div><Header/></div>
        <ForumTopicContainer allPosts={this.state.allPosts}/>
        <Onetopic/>
      </div>
    )
  }
}
