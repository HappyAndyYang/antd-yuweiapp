import React, { Component } from 'react';
import { NavBar, Icon, PullToRefresh } from 'antd-mobile';
import { connect } from 'dva';
// import { routerRedux } from 'dva/router';
import styles from '../deviceManager/deviceManager.less';

import OrderList from '../../components/WorkOrder/OrderList';

// const workList = [];
@connect(({ workorderlist, user, login }) => ({ workorderlist, user, login }))
class WorkOrderList extends Component {
  componentDidMount() {
    this.queryWorkOrderList();
  }
  queryWorkOrderList() {
    const {
      dispatch,
      workorderlist: { pagination: { pagesize, current } },
    } = this.props;
    const { data: { userid } } = JSON.parse(localStorage.login);
    dispatch({
      type: 'workorderlist/init',
      payload: '',
    });
    dispatch({
      type: 'workorderlist/getWorkOrderList',
      payload: { userid, pagesize, current },
    });
  }
  refresh = () => {
    const {
      dispatch,
      workorderlist: { pagination: { pagesize, current, total } },
    } = this.props;
    const { data: { userid } } = JSON.parse(localStorage.login);
    let page = current;
    if (total >= pagesize) {
      page = current + 1;
      dispatch({
        type: 'workorderlist/getWorkOrderList',
        payload: { userid, pagesize, currentpage: page },
      });
    }
  }
  back = () => {
    const { dispatch } = this.props;
    // dispatch(routerRedux.push('/'));
    dispatch({
      type: 'user/back',
      payload: '',
    });
  };
  add = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'workorderlist/addWorkOrder',
      payload: '',
    });
  }
  render() {
    const { dispatch, workorderlist: { status, data: { list } } } = this.props;
    // workList.push(...list);
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.back}
          className={styles.navbar}
          rightContent={[
            <Icon key="0" type="plus" size="xxs" style={{ marginRight: '5%' }} onClick={this.add} />,
          ]}
        >
          工单列表
        </NavBar>
        <PullToRefresh
          damping={60}
          style={{
            height: document.documentElement.clientHeight,
            overflow: 'auto',
          }}
          indicator={{ deactivate: '上拉可以刷新' }}
          direction="up"
          onRefresh={this.refresh}
        >
          { status ?
            <Icon type="loading" className={styles.loading} size="lg" />
            :
            <OrderList dispatch={dispatch} datalist={list} status={status} />
          }
        </PullToRefresh>
      </div>
    );
  }
}

export default WorkOrderList;
