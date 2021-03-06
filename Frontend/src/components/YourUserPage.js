import React, {useState} from 'react'
import styles from './YUP.module.css';

export default function YourUserPage(props) {

  const [comments, setComments] = useState(true);

  var postname = "";
  function findPostName(postid) {
    for(let i= 0; i < props.allPosts.length; i++) {
      if (props.allPosts[i].id === postid) {
        postname = props.allPosts[i].postname;
      }
    }
  }

  if (comments === true) {
    if (props.userComments.length > 0)
    {
      var output =                                     
        <div>
          {props.userComments.map(comment => (
          <div key={comment.id} className={styles.commentPostBox}>
            <div><b>{findPostName(comment.postsid)}{postname}</b>,  <b>{comment.timedate} </b> </div>
            <div className={styles.comment}>{comment.textcomment}</div>
            <div></div>
          </div>
          ))}
        </div>
    }
    else {
      output = <div className={styles.noPostComments}> You don't have any comments yet :(</div>
    }
  }
  else {
    if (props.userPosts.length > 0)
    {
      output = 
      <div>
        {props.userPosts.map(post => (
        <div key={post.id} className={styles.commentPostBox}>
          <div><img className={styles.postPicture} alt="post" src={`/pictures/${post.picturename}`}></img></div>
          <div><b>{post.postname}</b>, {post.timedate}  </div>
          <div>Likes: {post.likes}, Dislikes: {post.dislikes}</div>
          <div></div>
        </div>
        ))}
      </div>
    }
    else {
      output = <div className={styles.noPostComments}> You don't have any posts yet :(</div>
    }
  }

  function commentsOrPosts(trueFalse) {
    setComments(trueFalse);
  }

  return (
    <div>
      <div className={styles.YourName}> <h3>{props.UserData.username}</h3></div>
      <div className={styles.YourUserPage}>
        <div className={styles.YourImageContainer}>
          <img alt="user" className={styles.YourImage} src={`/userimages/${props.UserData.picturename}.png`}></img>
          <button onClick={props.showModal}>Change image</button>
        </div>
        <div className={styles.YourInfo}>
          I <br/>
          am <br/>
          <b>{props.UserData.username}</b>,<br/>
          and <br/>
          some <br/>
          info of me: <br/>
          <div className={styles.bioBox}> {props.UserData.bio}</div>
        </div>
        <div className={styles.YourSettings}>
          <div className={styles.Pointer} onClick={props.toggleDarkmode}>
            Darkmode <br/>
          </div>                    
          <div className={styles.Pointer} onClick={props.showModalBio}>
            change bio <br/>
           </div> 
        </div>
        <div className={styles.YourMedals}>
          <div ><img alt="medal" style={{background: "white"}} className={styles.medals} src="/medals/medal1.png"/></div>
          <div className={styles.medals}></div>
          <div className={styles.medals}></div>
          <div className={styles.medals}></div>     
          <div className={styles.medals}></div>
          <div className={styles.medals}></div>    
        </div>
        <div className={styles.YourHistory}>
          <div className={styles.flexBox}>
            <button className={styles.commentsTitle} onClick={() => commentsOrPosts(true)}>My comments:</button>
            <button className={styles.postsTitle} onClick={() => commentsOrPosts(false)}> My posts:</button>
          </div>
          <div className={styles.commentPost}>{output}</div>
        </div>
        <div onClick={props.deleteAccount} className={styles.DeleteButton}>
          DeleteAccount
        </div>
      </div>
    </div>
  )
}