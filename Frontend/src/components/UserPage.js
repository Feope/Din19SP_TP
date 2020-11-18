import React from 'react'
import styles from './UP.module.css';

export default function YourUserPage() {
    return (
        <div className={styles.YourUserPage}>
            <div className={styles.YourImage}>
                image
            </div>
            <div className={styles.YourInfo}>
                I <br/>
                am <br/>
                Human <br/>
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
