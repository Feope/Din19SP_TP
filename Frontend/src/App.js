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
import UserImage from './components/UserImage';
import ChangeBio from './components/ChangeBio';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

//const urlAddress = "https://awesome-tp.herokuapp.com/"; //url address for api Heroku
const urlAddress = "http://localhost:4001/" //url address for api Local

export default class App extends Component {
  constructor (props)
  {
    super(props);
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
      comments: [],
      postIds: [],
      loggedID: "",
      YourUserData: [],
      chosenTopicName: "",
      show: false,
      showChangeBio: false,
      userComments: [],
      userPosts: [],
      allComments: [],
      allUsers: [],
      postUsername: "",
      chosenUser: []
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
    axios.get(urlAddress + "users")
    .then((response) => {
      this.setState({allUsers: response.data});
    });
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const postid = urlParams.get('post');
    if (postid) {
      axios.get(urlAddress + "post/" + postid)
      .then((response) => {
        for(let i=0; i < this.state.allUsers.length; i++) {
          if (this.state.allUsers[i].id === response.data[0].ownerid) {
            var username = this.state.allUsers[i].username; 
          }
        }
        this.setState({postInfo: response.data[0], postUsername: username});
      }); 
    }
    axios.get( urlAddress + "comments/" + postid)
    .then((response) => {
      this.setState({comments: response.data});
    });
    axios.get(urlAddress + "postids")
    .then((response) => {
      this.setState({postIds: response.data})
    });
    axios.get(urlAddress + "comments")
    .then((response) => {
      this.setState({allComments: response.data});
    });
    if(this.checkCookie()){
      let temp = this.checkCookie();
      this.setState({loggedID: temp});
      this.setState({loggedIn: true});
      this.getUserData(temp);
      this.getUserComments(temp);
      this.getUserPosts(temp);
    }
    this.checkDarkmode();
  }

  getCookie = (cname) => {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  checkCookie = () => {
    var user = this.getCookie("username");
    if(user !== "") {
      return user;
    }
  } 

  checkDarkmode = () => {
    var dark = this.getCookie("darkmode");
    console.log(dark + "test");
    if(dark === "true"){
      document.body.style.backgroundColor = " rgb(56, 56, 61)"; 
    }
  }

  toggleDarkmode = () => {
    var dark = this.getCookie("darkmode");
    if(dark === "true"){
      document.cookie = "darkmode=false; expires=Thu, 18 Dec 2031 12:00:00 UTC; SameSite=Lax";
    }
    else if(dark === "false"){
      document.cookie = "darkmode=true; expires=Thu, 18 Dec 2031 12:00:00 UTC; SameSite=Lax";
    }
    else{
      document.cookie = "darkmode=true; expires=Thu, 18 Dec 2031 12:00:00 UTC; SameSite=Lax";
    }
    window.location.reload(false);
  }

  getUserData = (UID) => {
    const postid =UID;
    axios.get(urlAddress+ "userID/"+ postid)
    .then((response) => {
      this.setState({YourUserData: response.data[0]});
    });
  }

  getUserComments = (UID) => {
    axios.get(urlAddress + "userComments/" + UID)
    .then((response) => {
      this.setState({userComments: response.data});
    });
  }

  getUserPosts = (UID) => {
    axios.get(urlAddress + "userPosts/" + UID)
    .then((response) => {
      this.setState({userPosts: response.data});
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
      axios.post(urlAddress + "user", {
        username,
        password
      })
      .then((response) => {
        if(response.data){
          this.setState({loggedID: response.data});
          this.setState({loggedIn: true });
          this.setState({page: "" });
          this.getUserData(response.data);
          this.getUserComments(response.data);
          this.getUserPosts(response.data);
          document.cookie = "username=" + this.state.loggedID;
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
    if(username < 3 || password < 3){
      alert('Username and password need at least 3 characters each!');
    }
    else{
    axios.post(urlAddress + 'register', {
      username,
      password
    })
    .then((response) => {
      alert('Success');
      console.log(response);
    })
    .catch((error) => {
      alert('Username already taken');
      console.log(error);
    });
    }
  }

  deleteAccount = () => {
    let ids = this.state.loggedID;
    console.log(ids);

    if(this.state.loggedID){
      axios.post(urlAddress + 'delete', {
        ids
      })
      .then((response) => {
        alert('Successfully deleted your Account!');
      })
      .catch((error) => {
        console.log(error);
        alert('An error occurred please try again later!');
      })
    }

    this.setState({page: ""});
    this.setState({loggedID: ""});
    this.setState({loggedIn: false});
  }

  closeModal = () =>{
    this.setState({page: ""});
  }

  topicChange = (newTopic, topicName) => {
    axios.get(urlAddress + "picture_posts/" + newTopic)
    .then((response) => {
      this.setState({chosenTopicPosts: response.data, chosenTopicName:topicName})
    });
  }
  
  addComment = (comment) => {
    if (comment.length === 0) {
      alert("The comment box was empty, please write even something!")
    }
    else {
      let userID = 1
      if (this.state.loggedID !== "") {
        userID = this.state.loggedID
      }
      axios.post(urlAddress + 'comment',
        {
          postsid: this.state.postInfo.id, 
          userid: userID,
          textcomment: comment
        })
      .then((response => {
        console.log("new comment created");
        this.componentDidMount();
      }))
      .catch(error => {
      alert("hmm, something wrong???");
      })
    }
  };

  thumbUp = () => {
    axios.put(urlAddress + "like", 
      {
        likes: this.state.postInfo.likes+1,
        dislikes: this.state.postInfo.dislikes, 
        postid: this.state.postInfo.id
      })
    .then((response) => {
      console.log("likes updated");
      this.componentDidMount();
  })
  .catch(error => {
    console.log("unable to update likes")
  })
}

thumbDown = () => {
  axios.put(urlAddress + "like", 
    {
      likes: this.state.postInfo.likes,
      dislikes: this.state.postInfo.dislikes + 1, 
      postid: this.state.postInfo.id
    })
  .then((response) => {
    console.log("dislikes updated");
    this.componentDidMount();
})
.catch(error => {
  console.log("unable to update dislikes")
})
}

  changeUserImage = () => {
    axios.put(urlAddress + "userimage", {userid: this.state.loggedID})
    .then((response) => {
      this.showModal();
      this.getUserData(this.state.YourUserData.id);
    })
    .catch(error => {
      alert("hmmm, something went wrong. Please try again");
    })

  }

  showModal = () => {
    this.setState({show: !this.state.show});
  };

  showModalBio = () => {
    this.setState({showChangeBio: !this.state.showChangeBio});
  };

  changeBio = (event) => {
    axios.put(urlAddress + "changebio", 
      {userid: this.state.loggedID,
      newbio: event})
    .then((response) => {
      this.showModalBio();
      this.getUserData(this.state.YourUserData.id);
    })
    .catch(error => {
      alert("hmmm, something went wrong. Please try again");
    })
  }

  seeUserPage = (username) => {
    for (let i=0; i < this.state.allUsers.length; i++) {
      if(this.state.allUsers[i].username === username) {
        this.setState({chosenUser: this.state.allUsers[i]})
      }
    }
  }


  render() {

    let output = 
      <>
        <Switch>
          <Route exact path="/" component={() => <ForumTopicContainer topics={this.state.topics} topicChange={this.topicChange}/>}/>
          <Route path="/topics/" component={() => <PictureTopicContainer allComments={this.state.allComments} chosenTopicPosts={this.state.chosenTopicPosts} chosenTopicName={this.state.chosenTopicName}/>} />
          <Route path="/post/" component={() => <Onetopic urlAddress={this.urlAddress} 
                                                          postInfo={this.state.postInfo} 
                                                          postIds={this.state.postIds} 
                                                          comments={this.state.comments} 
                                                          addComment={this.addComment}
                                                          thumbUp={this.thumbUp}
                                                          thumbDown={this.thumbDown}
                                                          postUsername={this.state.postUsername}
                                                          seeUserPage={this.seeUserPage}/>} />
          <Route path="/users/" component ={() => <UserPage chosenUser={this.state.chosenUser} seeUserPage={this.seeUserPage}/>} />
        </Switch>
      </>

    let login =
      <>

      </>

    if(this.state.page === "youruserpage"){
      output = 
      <>
        <YourUserPage toggleDarkmode={this.toggleDarkmode} deleteAccount={this.deleteAccount} allPosts={this.state.allPosts} userPosts={this.state.userPosts} userComments={this.state.userComments} UserData={this.state.YourUserData} showModal={this.showModal} showModalBio={this.showModalBio}/>
        <UserImage showModal={this.showModal} changeUserImage={this.changeUserImage} show={this.state.show}/>
        <ChangeBio showModal={this.showModalBio} changeBio={this.changeBio} showChangeBio={this.state.showChangeBio}/>
        
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
        <Router>
          { login }
          <Header loggedIN={this.state.loggedIn} topicChange={this.topicChange} topics={this.state.topics} userChange={this.loginChange}/>
          { output } 
        </Router>
      </div>
    )
  }
}
