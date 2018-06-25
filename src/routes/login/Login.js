import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { NavBar, Button, InputItem, List } from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from '../deviceManager/deviceManager.less';

@connect(({ login }) => ({ login }))
class Login extends Component {
  componentDidMount() {
    if (localStorage.login) {
      const { data: { username }, loginTime } = JSON.parse(localStorage.login);
      const now = (new Date()).getTime();
      const day = Math.floor((now - (new Date(loginTime).getTime())) / (24 * 3600 * 1000));
      console.log(day);
      if (username && day < 15) {
        const { dispatch } = this.props;
        dispatch(routerRedux.push('/fault'));
      }
    }
  }
  onSubmit = () => {
    const { dispatch } = this.props;
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        const { username, passwd } = this.props.form.getFieldsValue();
        dispatch({
          type: 'login/login',
          payload: { username, passwd },
        });
      } else {
        alert('登陆失败');
      }
    });
  };

  render() {
    const { getFieldProps } = this.props.form;
    const { login: { status } } = this.props;
    return (
      <div>
        <NavBar className={styles.navbar}>登陆</NavBar>
        <form>
          <List>
            <InputItem {...getFieldProps('username')} clear placeholder="用户名" >用户名</InputItem>
            <InputItem {...getFieldProps('passwd')} clear placeholder="密码" type="password">密码</InputItem>
          </List>
        </form>
        { status ? <p style={{ color: 'red', marginLeft: '5%' }}>用户名或密码错误，请重新输入</p> : null}
        <Button type="default" onClick={this.onSubmit} className={styles.button}>登陆</Button>
      </div>
    );
  }
}
const LoginBasic = createForm()(Login);
export default LoginBasic;
