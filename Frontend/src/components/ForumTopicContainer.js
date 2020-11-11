import React from 'react'
import styles from './FTC.module.css';

export default function ForumTopicContainer(props) {

    return (
        <div className={styles.ForumTopicContainer}>
          {props.allPosts.map(post => (
            <div style={{backgroundImage: `url(/pictures/${post.picturename})`}} className={styles.ForumTopic}>
            <div className={styles.likesCommentsContainer}>
              <div>{post.likes}<img className={styles.likeIcons} src="/likes2.png"></img></div>
              <div>{post.dislikes}<img className={styles.likeIcons} src="/dislikes2.png"></img></div>
              <div>{post.comments}<img className={styles.likeIcons} src="/comment2.png"/></div> {/*should we add comment section to picture_posts or get the amount of comments from comments table?*/}
            </div>
          </div>))}
        </div>
    )
}
