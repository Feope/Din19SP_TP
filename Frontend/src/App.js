import React, { Component } from 'react';
import Header from './components/header';
import ForumTopicContainer from './components/ForumTopicContainer';
import PictureTopicContainer from './components/PictureTopicContainer';
import Onetopic from './components/onetopic';
import './App.css';
import axios from 'axios';
import UserPage from './components/UserPage'; 
import YourUserPage from './components/YourUserPage' ;
import Login from './components/Login';
import { BrowserRouter as Router, Route} from "react-router-dom";


const urlAddress = "https://awesome-tp.herokuapp.com/"; //url address for api Heroku
//const urlAddress = "http://localhost:4000/" //url address for api Local

export default class App extends Component {
  constructor ()
  {
    super();
    this.state = 
    {
      page: "",
      username: "",
      password: "",
      loggedIn: false,
      login: 'Login',
      allPosts: [],
      chosenTopicPosts: [],
      topics: [],
      postInfo: [],
      loggedID: "",
      YourUserData: []
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

  getUserData = (UID) => {
    const postid =UID;
    axios.get("http://localhost:4000/userID/"+ postid)
    .then((response) => {
      this.setState({YourUserData: response.data[0]});
      console.log(response.data[0]);
    });
  }


  loginChange = () => {
    if(this.state.loggedIn === false)
    {
      this.setState({ page: "login" });
    }
    else if(this.state.loggedIn === true){
      if(this.state.page === "" ){
        this.setState({ page: "youruserpage" });
      }
      else{
        this.setState({ page: "" });
      }
      console.log( this.state.page );
    }
  }

  updateUsername = (event) =>{
    this.setState({ username: event.target.value });
  }

  updatePassword = (event) =>{
    this.setState({ password: event.target.value });
  }

  onLogin = () => {
    let username = this.state.username;
    let password = this.state.password;
    if(this.state.login === "Login"){
      axios.post("http://localhost:4000/user", {
        username,
        password
      })
      .then((response) => {
        if(response.data){
          this.setState({loggedID: response.data});
          this.setState({loggedIn: true });
          this.setState({page: "" });
          this.getUserData(response.data);
        }
        else{
          this.setState({ loggedIn: false });
          alert("Username or Password incorrect");
        }        
      });

    }
    else if(this.state.login === "Register"){
      this.addUser(this.state.username, this.state.password);
    }
    console.log( this.state.loggedIn );
  }

  changeToRegister = () =>{
    if(this.state.login === "Login"){
      this.setState({ login: 'Register' });
    }
    else{
      this.setState({ login: 'Login' });
    }
  }

  addUser = (username, password) => {
    axios.post('http://localhost:4000/register', {
      username,
      password
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      alert('Username and password require at least 3 characters each');
      console.log(error);
    });
  }

  closeModal = () =>{
    this.setState({page: ""});
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

    let login =
      <>

      </>

    if(this.state.page === "youruserpage"){
      output = 
      <>
        <YourUserPage UserData={this.state.YourUserData}/>
      </>
    }
    else if(this.state.page === "userpage"){
      output = 
      <>
        <UserPage/>
      </>
    }
    
    if(this.state.page === "login"){
      login =
        <div className="modal" >
          <Login changeToRegister={this.changeToRegister} login={this.state.login} closeModal={this.closeModal} onLogin={this.onLogin} updatePassword={this.updatePassword} updateUsername={this.updateUsername} username={this.state.username} password={this.state.password}/>
        </div>
    }



    return (  
      <div className="appContainer">
        { login }
        <Header topicChange={this.topicChange} topics={this.state.topics} userChange={this.loginChange}/>
        { output } 
      </div>
    )
  }
}
