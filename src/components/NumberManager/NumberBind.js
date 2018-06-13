import React, { Component } from 'react';
import styles from './numberManager.less';

class NumberBind extends Component {
  render() {
    const { binder, mobile, phonenumber, bindTime } = this.props;
    return (
      <div>
        <div>
          <div className={styles.content} style={{ float: 'left', marginLeft: '5%' }} >绑定者 {binder}</div>
          <div className={styles.content} style={{ float: 'right', marginRight: '5%' }} >手机 {mobile}</div>
        </div>
        <br />
        <div className={styles.content}>绑定固定号码 {phonenumber}</div>
        <div className={styles.content}>绑定时间 {bindTime}</div>
      </div>
    );
  }
}

export default NumberBind;
