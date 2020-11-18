import React from 'react'
import styles from './Login.module.css'

export default function Login(props){
    return (
        <>   
            <div className={styles.LoginContainer}>
                <div onClick={props.closeModal} className={styles.closeModal}>x</div>
                <h1>AwesomeTP</h1>
                <div className={styles.UserName}>
                    <label htmlFor="username">Username:</label>
                    <input onChange={props.updateUsername} value={props.username} name="username"type="text" id="UserName"></input>
                </div>
                <div className={styles.Password}>
                    <label htmlFor="pasword">Password:</label>
                    <input onChange={props.updatePassword} value={props.password} name="password"type="password" id="PassWord"></input>
                </div>
                <button onClick={props.onLogin}>Login</button>
            </div>
        </>
    )
}