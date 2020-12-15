import React, {useState} from 'react';
import styles from './SP.module.css';

export default function SubmitPicture(props) {

    var pictures = [
            { name: "fort.jpg", url: `fort.jpg` },
            { name: "fort2.jpg", url: `fort2.jpg` },
            { name: "fort3.jpg", url: `fort3.jpg` },
            { name: "fort4.jpg", url: `fort4.jpg`},
            { name: "mol.jpg", url: `mol.jpg` },
            { name: "murder.jpg", url: `murder.jpg`},
            { name: "papermess.jpg", url: `papermess.jpg`},
            { name: "table.png", url: `table.png` },
            { name: "tower.jpg", url: `tower.jpg`} ,
            { name: "tower5.png", url: `tower5.png`}
        ]

    const [picture, setPicture] = useState("");

    function setnewPicture(name) {
        setPicture(name)
        }

        function post(event) {
        event.preventDefault();
        props.addPost(
            event.target['postname'].value,
            event.target['bio'].value,
            picture
        );
    }

  if(!props.showSubmitPicture) {
    return null;
  }
  else {
    return (
        <div className={styles.moduleContainer}>
          <div onClick={props.showModalPicture} className={styles.theXbutton}>X</div>
        <form className={styles.addPost} onSubmit={post}>
          <label htmlFor="postname">Create new post</label> <br/>
          Name of your post
          <textarea type="text" name="postname" className={styles.commentinsert}/>
          Info about your post
          <textarea type="text" name="bio" className={styles.commentinsert}/>
          <div type="text" name="picturename" className={styles.pictureContainer}>
          {pictures.map(picture => (
            <div key={picture.name} name="picturename">
              <img src={`/pictures/${picture.url}`} alt="+" onClick={() => setnewPicture(picture.name)} className={styles.pictures}></img>
            </div>
          ))}
          </div>
          <input type="submit" value="Submit" className={styles.submitbutton}/> 
        </form>
      </div>
    )
  }
}