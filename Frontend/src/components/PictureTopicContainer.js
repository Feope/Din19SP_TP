import React from 'react'
import styles from './PTC.module.css';

export default function pictureTopicContainer(props) {

    return (
        <div className={styles.pictureTopicContainer}>
          {props.allPosts.map(post => (
            <div style={{backgroundImage: `url(/pictures/${post.picturename})`}} className={styles.pictureTopic}>
            <div className={styles.likesCommentsContainer}>
              <div>{post.likes}<img className={styles.likeIcons} src="/likes2.png"></img></div>
              <div>{post.dislikes}<img className={styles.likeIcons} src="/dislikes2.png"></img></div>
              <div>{post.comments}<img className={styles.likeIcons} src="/comment2.png"/></div> {/*should we add comment section to picture_posts or get the amount of comments from comments table?*/}
            </div>
          </div>))}
        </div>
    )
}