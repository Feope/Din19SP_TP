import React from 'react'
import styles from './PTC.module.css';

export default function PictureTopicContainer(props) {

  function countComments(postid) {
    let testing = 0;
    for (let i = 0; i < props.allComments.length; i++) {
      if(props.allComments[i].postsid === postid) {
        testing += 1;
      }
    }
    return testing
  }
  function post(event) {
    event.preventDefault();
    props.addPost(
      event.target['addPost'].value
    );
  }
  function postcomment(event) {
    event.preventDefault();
    props.addPost(
      event.target['postcomment'].value
    )
  }

    return (
      <>
        <div className={styles.title}>
          {props.chosenTopicName}
        </div>
        <div className={styles.pictureTopicContainer}>
          {props.chosenTopicPosts.map(post => (
            <a key={post.id} href={`/post?post=${post.id}`}>
            <div  style={{backgroundImage: `url(/pictures/${post.picturename})`}} className={styles.pictureTopic}>
              <div className={styles.likesCommentsContainer}>
                <div>{post.likes}<img alt="likes" className={styles.likeIcons} src="/likes2.png"></img></div>
                <div>{post.dislikes}<img alt="dislikes" className={styles.likeIcons} src="/dislikes2.png"></img></div>
                <div >{countComments(post.id)} <img alt="comments" className={styles.likeIcons} src="/comment2.png"/></div> {/*should we add comment section to picture_posts or get the amount of comments from comments table?*/}
              </div>
            </div>
            </a>
          ))}
        </div>
        <div>
          <form className={styles.addPost} onSubmit={post}>
            <label htmlFor="addpost">Create new post</label>
            <textarea type="text" name="addpost" classname={styles.commentinsert}/>
            <textarea type="text" name="postcomment" classname={styles.commentinsert}/>
            <input type="submit" value="Submit" className={styles.submitbutton}/> 
          </form>
        </div>
      </>
    )
}