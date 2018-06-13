import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import styles from './workOrder.less';

class WorkOrder extends Component {
  detail = () => {
    const { orderid, dispatch } = this.props;
    dispatch(routerRedux.push(`/fault/${orderid}`));
  }

  render() {
    const { orderid, type, orderstatus, createtime } = this.props;
    return (
      <div onClick={this.detail}>
        <div className={styles.content}>工单ID {orderid}</div>
        <Flex style={{ marginLeft: '5%', fontSize: '14px' }}>
          <Flex.Item>故障类型 {type}</Flex.Item>
          <Flex.Item>处理状态 {orderstatus}</Flex.Item>
        </Flex>
        <Flex style={{ marginLeft: '5%', fontSize: '14px' }}>
          <Flex.Item>提交时间 {createtime}</Flex.Item>
        </Flex>
      </div>
    );
  }
}

export default WorkOrder;
