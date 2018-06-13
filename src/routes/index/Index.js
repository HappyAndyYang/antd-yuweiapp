import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import { NavBar, Button, Flex, WhiteSpace } from 'antd-mobile';
import { connect } from 'dva';
import styles from '../deviceManager/deviceManager.less';

@connect(({ index }) => ({ index }))
class Main extends Component {
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
  render() {
    return (
      <div>
        <NavBar className={styles.navbar}>商云通</NavBar>
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
