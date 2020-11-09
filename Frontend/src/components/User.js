import React from 'react'
import styles from './user.module.css'

export default function User(){
    return (
        <>
            <div className={styles.UserContainer}>
                <div className={styles.ProfilePic}>1</div>
                <div className={styles.InfoPanel}>2</div>
                <div className={styles.UserMedals}>3</div>
                <div className={styles.history}>4</div>
                <button className={styles.DeleteButton}>"I regret this" -button</button>
            </div>
        </>
    )
}