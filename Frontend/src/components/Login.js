import React from 'react'
import styles from './Login.module.css'

export default function Login(){
    return (
        <>
            <div className={styles.LoginContainer}>
                <h1>AwesomeTP</h1>
                <div className={styles.UserName}>
                    <label for="username">Username:</label>
                    <input name="username"type="text" id="UserName"></input>
                </div>
                <div className={styles.Password}>
                    <label for="pasword">Password:</label>
                    <input name="password"type="text" id="PassWord"></input>
                </div>
                <button>Login</button>
            </div>
        </>
    )
}