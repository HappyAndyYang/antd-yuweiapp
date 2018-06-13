import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import styles from './numberManager.less';

class Number extends Component {
  detail = () => {
    const { data: { numberId }, dispatch } = this.props;
    dispatch(routerRedux.push(`/numbermanager/${numberId}`));
  }

  render() {
    const {
      data: {
        phonenumber,
        binder,
        mobile,
      },
    } = this.props;
    return (
      <div onClick={this.detail}>
        <div className={styles.content}>号码：{phonenumber}</div>
        <div className={styles.content}>当前绑定人员姓名：{binder}</div>
        <div className={styles.content}>当前绑定人员手机：{mobile}</div>
      </div>
    );
  }
}

export default Number;
