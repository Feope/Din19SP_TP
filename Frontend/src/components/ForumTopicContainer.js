import React from 'react'
import styles from './FTC.module.css';

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
    )
}