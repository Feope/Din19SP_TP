import React, {useEffect} from 'react'
import styles from './UP.module.css';

export default function YourUserPage(props) {

  useEffect(()=>{
    if (!props.chosenUser.username) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const username = urlParams.get('un');
     props.seeUserPage(username)
    }
    }, [props])

    return (
        <div className={styles.YourUserPage}>
            <div className={styles.YourImage}>
              <img alt="user" className={styles.YourImage} src={`/userimages/${props.chosenUser.picturename}.png`}></img>
            </div>
            <div className={styles.YourInfo}>
                I <br/>
                am <br/>
                <b>{props.chosenUser.username}</b>,<br/>
                and <br/>
                some <br/>
                info of me: <br/>
                <div className={styles.bioBox}> {props.chosenUser.bio}</div>
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
                recent post <br/>
                recent comment <br/>
                recent comment <br/>
            </div>            
        </div>
    )
}
