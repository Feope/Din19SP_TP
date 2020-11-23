import React from 'react';
import styles from './onetopic.module.css';

export default function onetopic(props) {


  return (
    <div>
      <div className={styles.titleContainer}>
        <img alt="back button" src="/back2.png" className={styles.backForward}/>
        <div className={styles.title}>{props.postInfo.postname}</div>
        <img alt="forward button" src="/forward2.png" className={styles.backForward}/>
      </div>
      <div className={styles.oneTopicContainer}>
        <div  className={styles.ForumTopic}>
          <img alt=" for the post" src={`/pictures/${props.postInfo.picturename}`} className={styles.picture}></img>
          <div className={styles.likesCommentsContainer}>
            <div>{props.postInfo.likes}<img alt="likes" className={styles.likeIcons} src="/likes2.png"></img></div>
            <div>{props.postInfo.dislikes}<img alt="dislikes" className={styles.likeIcons} src="/dislikes2.png"></img></div>
            <div>?<img alt="comments" className={styles.likeIcons} src="/comment2.png"/></div> {/*should we add comment section to picture_posts or get the amount of comments from comments table?*/}
          </div>
        </div>
        <div className={styles.textArea}>
          Here are some things that the owner has written of the thingy
        </div>
      </div>
        
      <div className={styles.commentsTitle}>COMMENTS</div>
      <ul>
        <li key={props.comments.id}>{props.comments.textcomment}</li>
      </ul>
      <form className={styles.commentForm}>
        <label htmlFor="comment">Write new comment:</label><br/>
        <input type="text" name="comment"/> <br/>
        <input type="submit" value="Submit"/>
      </form>
    </div>
  )
}
