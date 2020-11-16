import React, { Component } from 'react';
import Header from './components/header';
import ForumTopicContainer from './components/ForumTopicContainer';
import PictureTopicContainer from './components/PictureTopicContainer';
import Onetopic from './components/onetopic';
import './App.css';
import axios from 'axios';
import YourUserPage from './components/YourUserPage' ;
import Login from './components/Login';
import { BrowserRouter as Router, Route} from "react-router-dom";

//const urlAddress = "https://awesome-tp.herokuapp.com/"; //url address for api Heroku
const urlAddress = "http://localhost:4000/" //url address for api Local

export default class App extends Component {
  constructor ()
  {
    super();
    this.state = 
    {
      userpage: false,
      allPosts: [],
      chosenTopicPosts: [],
      topics: [],
      postInfo: []
    };
  }

  componentDidMount() {
    axios.get(urlAddress + "picture_posts")
    .then((response) => {
      this.setState({allPosts: response.data})
    });
    axios.get(urlAddress + "topics")
    .then((response) => {
      this.setState({topics: response.data})
    });
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const postid = urlParams.get('post');
  
    axios.get("http://localhost:4000/post/"+ postid)
    .then((response) => {
      this.setState({postInfo: response.data[0]});
    });
  };


  loginChange = () => {
    this.setState({ userpage: !this.state.userpage });
    console.log( this.state.userpage );
  }

  topicChange = (newTopic) => {
    axios.get(urlAddress + "picture_posts/" + newTopic)
    .then((response) => {
      this.setState({chosenTopicPosts: response.data})
      console.log("somethin happened");
    });
  }

  render() {

    let output = 
      <>
        <Router>
          <Route exact path="/" component={() => <ForumTopicContainer topics={this.state.topics} topicChange={this.topicChange}/>}/>
          <Route path="/topics/" component={() => <PictureTopicContainer chosenTopicPosts={this.state.chosenTopicPosts}/>} />
          <Route path="/post/" component={() => <Onetopic urlAddress={this.urlAddress} postInfo={this.state.postInfo}/>} />
        </Router>
      </>

    if(this.state.userpage === true){
      output = 
      <>
        <YourUserPage/>
      </>
    }

    return (  
      <div className="appContainer">
        <Header  userChange={this.loginChange} topics={this.state.topics} topicChange={this.topicChange}/>
        { output }
        <div><Login/></div>
      </div>
    )
  }
}
