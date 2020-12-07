import React from 'react';
import styles from './CB.module.css';

export default function ChangeBio(props) {

  function bio(event) {
    event.preventDefault();
    props.changeBio(event.target['bio'].value);
  }

  if(!props.showChangeBio) {
    return null;
  }
  else {
    return (
      <div className={styles.moduleContainer}>
        <div className={styles.modalText}> 
          Yeah, I agree. Your bio looks really boring. <br/>You should definitely change it!
        </div>
        <div>
          <form className={styles.commentForm} onSubmit={bio}>
            <label htmlFor="changebio">Write new bio: (max characters 150)</label><br/>
            <textarea maxLength="150" type="text" name="bio" className={styles.bioinsert}/> <br/>
            <button type="submit" value="Submit" className={styles.submitbutton}>This is my new bio!</button>
            <button onClick={() => props.showModal()} className={styles.button}>I'm happy with my bio</button>
          </form>
        </div>
      </div>
    )
  }
}