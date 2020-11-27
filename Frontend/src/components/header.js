import React from 'react'
import styles from './header.module.css';
import {Link} from "react-router-dom";

export default function header(props) {
  return (
    <>
      <div className={styles.headerBox}>
        <div id={styles.headerLogo}><Link to="/">AwesomeTP</Link></div>
        <div className={styles.loginIndicator} onClick={props.userChange}><img alt="userImage" className={styles.userImage} src="/user.png"></img></div>
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
