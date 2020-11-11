import React from 'react'
import styles from './YUP.module.css';

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
            <div className={styles.YourSettings}>
                setting 1 <br/>
                setting 2 <br/>
                setting 3 <br/>
                setting 4 <br/>
            </div>
            <div className={styles.YourMedals}>
                <div className={styles.medals}>medal 1</div>
                <div className={styles.medals}>medal 2</div>
                <div className={styles.medals}>medal 3</div>
                <div className={styles.medals}>medal 4</div>     
                <div className={styles.medals}>medal 5</div>
                <div className={styles.medals}>medal 6</div>    
            </div>
            <div className={styles.YourHistory}>
                recent post <br/>
                recent comment <br/>
                recent comment <br/>
            </div>
            <div className={styles.DeleteButton}>
                DeleteAccount
            </div>
            
        </div>
    )
}
