import React, { Component } from 'react';
import styles from './UI.module.css';

export default class UserImage extends Component {
  render() {
    if(!this.props.show) {
      return null;
    }
    else {

    return (
      <div className={styles.moduleContainer}>
        <div className={styles.modalText}> 
          AHA! So you are not happy with your current picture?
          I dare you to try and change it!
        </div>
        <div>
          <button onClick={() => this.props.changeUserImage()} className={styles.button}>I dare!</button>
          <button onClick={() => this.props.showModal()} className={styles.button}>I'm happy with my picture</button>
        </div>
      </div>
    )
  }}
}
