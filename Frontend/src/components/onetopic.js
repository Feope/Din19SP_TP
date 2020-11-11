import React from 'react'
import styles from './onetopic.module.css';

export default function onetopic() {
  return (
    <div>
      <div className={styles.titleContainer}>
        <img alt="back button" src="/back2.png" className={styles.backForward}/>
        <div className={styles.title}>TITLE</div>
        <img alt="forward button" src="/forward2.png" className={styles.backForward}/>
      </div>
      <div className={styles.oneTopicContainer}>
        <div  className={styles.ForumTopic}>
          <img alt=" for the post" src="/pictures/fort.jpg" className={styles.picture}></img>
          <div className={styles.likesCommentsContainer}>
            <div>1<img alt="likes" className={styles.likeIcons} src="/likes2.png"></img></div>
            <div>2<img alt="dislikes" className={styles.likeIcons} src="/dislikes2.png"></img></div>
            <div>3<img alt="comments" className={styles.likeIcons} src="/comment2.png"/></div> {/*should we add comment section to picture_posts or get the amount of comments from comments table?*/}
          </div>
        </div>
        <div className={styles.textArea}>
          Here are some things that the owner has written of the thingy
        </div>
      </div>
      <div className={styles.commentsTitle}>COMMENTS</div>
      <ul>
        <li>here</li>
        <li>some</li>
        <li>comments?</li>
        <li>what about date and the person who has written the comment?</li>
        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut convallis mollis ante. Vestibulum at massa a lacus sodales ultrices. Integer tempor, tortor at hendrerit laoreet, ex ante placerat turpis, sit amet tempus felis ligula eget nisl. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed porta vehicula lorem, non pellentesque ligula finibus a. Proin tempus arcu ligula, molestie volutpat turpis auctor id. Integer sed purus at libero placerat auctor. Sed fermentum augue quis odio iaculis, et porta justo sagittis. Cras aliquam dolor tortor, sed efficitur libero eleifend quis. Donec consectetur tempus dolor, et scelerisque magna placerat eget. Ut vitae finibus arcu, non pellentesque nisi. Suspendisse sit amet egestas tellus. Vivamus leo lectus, placerat dignissim purus et, dictum venenatis ante.</li>
      </ul>
      <form className={styles.commentForm}>
        <label htmlFor="comment">Write new comment:</label><br/>
        <input type="text" name="comment"/> <br/>
        <input type="submit" value="Submit"/>
      </form>
    </div>
  )
}
