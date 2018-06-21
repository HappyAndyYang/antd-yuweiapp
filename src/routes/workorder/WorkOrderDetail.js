import React, { Component } from 'react';
import { NavBar, Icon, Card, WingBlank, ImagePicker } from 'antd-mobile';
import { connect } from 'dva';
import moment from 'moment';
import { faultType, dealType } from '../../../mock/api';
import styles from '../deviceManager/deviceManager.less';

@connect(({ workorderlist, user }) => ({ workorderlist, user }))
class WorkOrderDetail extends Component {
  back = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/back',
      payload: '',
    });
  };
  render() {
    const { workorderlist: { data: { list } }, match: { params: { orderid } } } = this.props;
    // console.log(localStorage.getItem('user'));
    // debugger;
    const detailData = list ? list.find(item => item.orderid === orderid) : [];
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.back}
          className={styles.navbar}
        >
          工单详情
        </NavBar>
        <p className={styles.content}>故障号码：{detailData.phonenumber}</p>
        <p className={styles.content}>
          故障类型：{(faultType.find(faultItem => faultItem.value === detailData.type).label)}
        </p>
        <p className={styles.content}>故障描述</p>
        <WingBlank size="lg">
          <Card>
            <Card.Body>
              <div>{detailData.detail}</div>
            </Card.Body>
          </Card>
        </WingBlank>
        <ImagePicker files={detailData.pictures} selectable={false} />
        <p className={styles.content} style={{ marginTop: '20px' }} >联系人号码：{detailData.mobile}</p>
        <p className={styles.content}>
          处理状态：{(dealType.find(dealItem => dealItem.value === detailData.dealflag).label)}
        </p>
        <p className={styles.content}>
          创建时间：{moment(detailData.createtime).format('YYYY-MM-DD hh:mm:ss')}
        </p>
        <p className={styles.content}>处理详情</p>
        <WingBlank size="lg">
          <Card>
            <Card.Body>
              <div>{detailData.content}</div>
            </Card.Body>
          </Card>
        </WingBlank>
      </div>
    );
  }
}

export default WorkOrderDetail;
