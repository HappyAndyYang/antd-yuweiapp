import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { connect } from 'dva';
import styles from '../deviceManager/deviceManager.less';
import Number from '../../components/NumberManager/NumberList';

@connect(({ numbermanager, user }) => ({ numbermanager, user }))
class NumberList extends Component {
  componentDidMount() {
    this.queryNumberBindList();
  }
  queryNumberBindList() {
    const { dispatch } = this.props;
    dispatch({
      type: 'numbermanager/getNumberBindList',
      payload: {},
    });
  }
  back = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/back',
      payload: '',
    });
  };
  render() {
    const { dispatch, numbermanager: { status, data: { list } } } = this.props;
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.back}
          className={styles.navbar}
        >
          号码列表
        </NavBar>
        { status ?
          <Icon type="loading" className={styles.loading} size="lg" />
          :
          <Number dispatch={dispatch} datalist={list} />
        }
      </div>
    );
  }
}

export default NumberList;
