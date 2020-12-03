import React from 'react'
import styles from './header.module.css';
import {Link} from "react-router-dom";
let logged = "";

export default function header(props) {
  if(props.loggedIN){
    logged = "";
  }
  else{
    logged = "Login";
  }

  return (
    <>
      <div className={styles.headerBox}>
        <div id={styles.headerLogo}><a href="/">AwesomeTP</a></div>
        <div className={styles.loginIndicator} onClick={props.userChange}>{logged}<img alt="userImage" className={styles.userImage} src="/user.png"></img></div>
      </div>
      <div className={styles.headerLinksContainer}>
        {props.topics.map(topic => (
          <Link key={topic.topicid} className={styles.headerLinks} to={`/topics/${topic.topic}`} onClick={()=> props.topicChange(topic.topicid, topic.topic)}>
            <div>{topic.topic}</div>
          </Link>
        ))}
      </div>
    </>
  )
}
