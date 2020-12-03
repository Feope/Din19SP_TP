import React from 'react';
import styles from './onetopic.module.css';

export default function Onetopic(props) {

 function comment(event) {
   event.preventDefault();
   props.addComment(
     event.target['comment'].value
   );
 }

 
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const postid = urlParams.get('post');
    console.log(postid);
    var forwardPostid = "";
    var backwardPostid = "";
    const currentIndex = props.postIds.indexOf(postid);
    if (currentIndex === props.postIds.length-1) {
      forwardPostid = props.postIds[0]; 
    }
    else {
      forwardPostid = props.postIds[currentIndex+1]; 
    }
    if (currentIndex === 0) {
      backwardPostid = props.postIds[props.postIds.length-1];
    }
    else {
      backwardPostid = props.postIds[currentIndex-1];
    }

  return (
    <div>
      <div className={styles.titleContainer}>
        <a href={`/post?post=${backwardPostid}`}>
          <img alt="back button" src="/back2.png" className={styles.backForward}/>
        </a>
        <div className={styles.title}>{props.postInfo.postname}</div>
        <a href={`/post?post=${forwardPostid}`}>
          <img alt="forward button" src="/forward2.png" className={styles.backForward}/>
        </a>
      </div>
      <div className={styles.oneTopicContainer}>
        <div  className={styles.ForumTopic}>
          <img alt=" for the post" src={`/pictures/${props.postInfo.picturename}`} className={styles.picture}></img>
          <div className={styles.likesCommentsContainer}>
            <div>{props.postInfo.likes}<img alt="likes" className={styles.likeIcons} src="/likes2.png" onClick={() => props.thumbUp()}></img></div>
            <div>{props.postInfo.dislikes}<img alt="dislikes" className={styles.likeIcons} src="/dislikes2.png" onClick={() => props.thumbDown()}></img></div>
            <div>{props.comments.length}<img alt="comments" className={styles.likeIcons} src="/comment2.png"/></div> {/*should we add comment section to picture_posts or get the amount of comments from comments table?*/}
          </div>
        </div>
        <div className={styles.textArea}>
          {props.postInfo.bio}
        </div>
      </div>
        
      <div className={styles.commentsTitle}>COMMENTS</div>
        <div> 
          {props.comments.map( comment => (
            <div key={comment.id} className={styles.commentBox}>
              <div className={styles.userid}> Anonymous {comment.userid} </div>
              <div className={styles.textComment}> {comment.textcomment} </div> 
              <div className={styles.commentTime}> {comment.timedate} </div>
            </div>
          ))}
        </div>
      <form className={styles.commentForm} onSubmit={comment}>
        <label htmlFor="comment">Write new comment:</label><br/>
        <textarea type="text" name="comment" className={styles.commentinsert}/> <br/>
        <input type="submit" value="Submit" className={styles.submitbutton}/>
      </form>
    </div>
  )
}
