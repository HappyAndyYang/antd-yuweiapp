import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { NavBar, Button, InputItem, List } from 'antd-mobile';
import { createForm } from 'rc-form';
import { getQueryStrFromUrl } from '../../utils/utils';
import styles from '../deviceManager/deviceManager.less';

@connect(({ stafflogin, weichat }) => ({ stafflogin, weichat }))
class StaffLogin extends Component {
  componentDidMount() {
    // if (localStorage.stafflogin) {
    //   const { data: { staffname, staffid }, loginTime } = JSON.parse(localStorage.stafflogin);
    //   const now = (new Date()).getTime();
    //   const day = Math.floor((now - (new Date(loginTime).getTime())) / (24 * 3600 * 1000));
    //   // console.log(day);
    //   if (staffname && staffid && day < 15) {
    //     const { dispatch } = this.props;
    //     dispatch(routerRedux.push('/stafforderlist'));
    //   }
    // }
    const {
      dispatch,
    } = this.props;
    const code = getQueryStrFromUrl('code');
    const userCode = localStorage.getItem('userCode');
    if (userCode || code) {
      if (userCode) {
        this.login();
      } else {
        localStorage.setItem('userCode', code);
        dispatch({
          type: 'weichat/getUserInfo',
          payload: { code },
        }).then(() => {
          this.login();
        });
      }
    } else {
      const backurl = window.document.location.href;
      dispatch({
        type: 'weichat/getAuthorizeURLFroWebsite',
        payload: { backurl },
      });
    }
  }
  onSubmit = () => {
    const { dispatch } = this.props;
    const { weichat: { data: { openid } } } = this.props;
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        const { staffname, passwd } = this.props.form.getFieldsValue();
        dispatch({
          type: 'stafflogin/login',
          payload: { staffname, passwd, openid },
        });
      } else {
        alert('登陆失败');
      }
    });
  };
  // componentDidMount() {
  //   this.queryBindTerminal();
  // }
  login() {
    if (localStorage.stafflogin) {
      const { data: { staffname, staffid }, loginTime } = JSON.parse(localStorage.stafflogin);
      const now = (new Date()).getTime();
      const day = Math.floor((now - (new Date(loginTime).getTime())) / (24 * 3600 * 1000));
      // console.log(day);
      if (staffname && staffid && day < 15) {
        const { dispatch } = this.props;
        dispatch(routerRedux.push('/stafforderlist'));
      }
    }
  }

  render() {
    const { getFieldProps } = this.props.form;
    const { stafflogin: { status } } = this.props;
    // document.title = '员工登陆';
    return (
      <div>
        <NavBar className={styles.navbar}>员工登陆</NavBar>
        <form>
          <List>
            <InputItem {...getFieldProps('staffname')} clear placeholder="用户名" >用户名</InputItem>
            <InputItem {...getFieldProps('passwd')} clear placeholder="密码" type="password">密码</InputItem>
          </List>
        </form>
        { status ? <p style={{ color: 'red', marginLeft: '5%' }}>用户名或密码错误，请重新输入</p> : null}
        <Button type="default" onClick={this.onSubmit} className={styles.button}>登陆</Button>
      </div>
    );
  }
}
const StaffLoginBasic = createForm()(StaffLogin);
export default StaffLoginBasic;
