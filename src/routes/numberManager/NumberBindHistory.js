import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { connect } from 'dva';
import styles from '../deviceManager/deviceManager.less';

import NumberList from '../../components/NumberManager/NumberBindList';

@connect(({ numbermanager, user }) => ({ numbermanager, user }))
class NumberBindHistory extends Component {
  back = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/back',
      payload: '',
    });
  };
  render() {
    const {
      match: {
        params: {
          phonenumber,
        },
      },
      numbermanager: {
        status,
        data: {
          list,
        },
      },
    } = this.props;
    const detailData = list ? list.find(item => item.phonenumber === phonenumber) : [];
    const {
      history,
    } = detailData;
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.back}
          className={styles.navbar}
        >
          {phonenumber}的绑定列表
        </NavBar>
        { status ? <Icon type="loading" className={styles.loading} size="lg" /> : <NumberList datalist={history} />}
      </div>
    );
  }
}
export default NumberBindHistory;
