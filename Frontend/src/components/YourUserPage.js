import React from 'react'
import styles from './YUP.module.css';

export default function YourUserPage(props) {
    return (
        <div>
            <div className={styles.YourName}> <h3>{props.UserData.username}</h3></div>
            <div className={styles.YourUserPage}>
                <div className={styles.YourImageContainer}>
                    <img alt="user" className={styles.YourImage} src={`userimages/${props.UserData.picturename}.png`}></img>
                    <button onClick={props.showModal}>Change image</button>
                </div>
                <div className={styles.YourInfo}>
                    I <br/>
                    am <br/>
                    {props.UserData.username}<br/>
                </div>
                <div className={styles.YourSettings}>
                    <div className={styles.Pointer} onClick={props.toggleDarkmode}>
                    Darkmode <br/>
                    </div>                    
                    setting 2 <br/>
                    setting 3 <br/>
                    setting 4 <br/>
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
                <div onClick={props.deleteAccount} className={styles.DeleteButton}>
                    DeleteAccount
                </div>
                
            </div>
        </div>
    )
}
