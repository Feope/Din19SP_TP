import React from 'react';
import styles from './FTC.module.css';
import {Link} from "react-router-dom";

export default function ForumTopicContainer(props) {

<<<<<<< HEAD
export default function ForumTopicContainer(props) {
    return (
        <div className={styles.ForumTopicContainer}>
            {props.allTopics.map(items => (
                <div key={items.topicid} className={styles.ForumTopic}>
                    <div>{items.picture}</div>
                    <div>{items.topic}</div>
            </div>
            ))}
        </div>
=======
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
>>>>>>> 1c1d76febc8473d2c10be2d693656dbcef89a3af
    )
}