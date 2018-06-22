import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import { NavBar, Button, Flex, WhiteSpace } from 'antd-mobile';
import { connect } from 'dva';
import styles from '../deviceManager/deviceManager.less';

@connect(({ index }) => ({ index }))
class Main extends Component {
  componentDidMount() {
    if (!localStorage.login) {
      const { dispatch } = this.props;
      dispatch(routerRedux.push('/login'));
    }
  }
  order = () => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/order'));
  };
  workorder = () => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/fault'));
  };
  numbermanager = () => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/numbermanager'));
  };
  bindlist = () => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/bindlist'));
  };
  logout = () => {
    const { dispatch } = this.props;
    localStorage.removeItem('login');
    dispatch(routerRedux.push('/login'));
  }
  render() {
    return (
      <div>
        <NavBar
          className={styles.navbar}
          // rightContent="退出"
          rightContent={<Button size="small" style={{ background: '#FFCC00', border: '0px solid #FFCC00' }} onClick={this.logout}> 退出 </Button>}
        >
          商云通
        </NavBar>
        <WhiteSpace size="lg" />
        <Flex justify="start" wrap="wrap" className={styles.content}>
          <Button className={styles.flexItem} onClick={this.order}>订购</Button>
          <Button className={styles.flexItem} onClick={this.workorder}>报障</Button>
          <Button className={styles.flexItem} onClick={this.numbermanager}>号码管理</Button>
          <Button className={styles.flexItem} onClick={this.bindlist}>绑定列表</Button>
        </Flex>
      </div>
    );
  }
}

export default Main;
