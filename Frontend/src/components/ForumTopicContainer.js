import React from 'react';
import styles from './FTC.module.css';
import {Link} from "react-router-dom";

export default function ForumTopicContainer(props) {

    return (
      <div className={styles.ForumTopicContainer}>
        {props.topics.map(topic => (
          <div className={styles.ForumTopic} key={topic.topicid} style={{backgroundImage: `url(/topics/${topic.picture})`}}> 
            <Link to={`/topics/${topic.topic}`} onClick={()=> props.topicChange(topic.topicid)}>
              <div className={styles.pictureTitle}><span className={styles.noOpacity}>{topic.topic}</span></div> 
            </Link>
          </div> 
        ))}
      </div>
    )
}