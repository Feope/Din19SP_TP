import React from 'react'
import styles from './header.module.css';

export default function header(props) {
  return (
    <>
      <div className={styles.headerBox}>
        <div id={styles.headerLogo}>AwesomeTP</div>
        <div className={styles.loginIndicator} onClick={props.userChange}><img alt="userImage" className={styles.userImage} src="/user.png"></img></div>
      </div>
      <div className={styles.headerLinksContainer}>
        <div className={styles.headerLinks}>Different</div>        
        <div className={styles.headerLinks}>categories</div>
        <div className={styles.headerLinks}>found</div>
        <div className={styles.headerLinks}>here</div>
      </div>
    </>
  )
}
