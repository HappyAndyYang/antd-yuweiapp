import React, { Component } from 'react';
import { NavBar, Icon, Card, WingBlank, ImagePicker, TextareaItem, Button, Picker, List, Modal } from 'antd-mobile';
import { connect } from 'dva';
import moment from 'moment';
import { createForm } from 'rc-form';
import { faultType, dealType } from '../../../mock/api';
import styles from '../deviceManager/deviceManager.less';

const ListItem = List.Item;
@connect(({ stafforderlist, user, workorderlist }) => ({ stafforderlist, user, workorderlist }))
class StaffOrderDetail extends Component {
  componentDidMount() {
    this.queryWorkOrderDetail();
  }
  onClose = () => {
    const {
      dispatch,
    } = this.props;
    dispatch({
      type: 'stafforderlist/onclose',
    });
  }
  onSubmit = () => {
    const {
      dispatch,
      match: {
        params: { orderid },
      },
    } = this.props;
    const { data: { staffid } } = JSON.parse(localStorage.stafflogin);
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        const { dealcontent } = this.props.form.getFieldsValue();
        const dealstatus = this.props.form.getFieldsValue().dealstatus ?
          this.props.form.getFieldsValue().dealstatus : [];
        dispatch({
          type: 'stafforderlist/commit',
          payload: { staffid, dealcontent, orderid, dealstatus: dealstatus[0] },
        });
      } else {
        alert('登陆失败');
      }
    });
  };
  queryWorkOrderDetail() {
    const {
      dispatch,
      match: {
        params: { orderid },
      },
    } = this.props;
    dispatch({
      type: 'workorderlist/getWorkOrderDetail',
      payload: { orderid },
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
    const { getFieldProps } = this.props.form;
    // const {
    //   stafforderlist: {
    //     data: {
    //       list,
    //     },
    //     updateData: {
    //       flag,
    //       status,
    //     },
    //   },
    //   match: {
    //     params: {
    //       orderid,
    //     },
    //   },
    // } = this.props;
    const {
      stafforderlist: {
        updateData: {
          flag,
          status,
        },
      },
      workorderlist: {
        detail: {
          status: detailstatus,
          data: detailData,
        },
      },
    } = this.props;
    // const detailData = list ? list.find(item => item.orderid === orderid) : [];
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
        {
          detailstatus ?
            <Icon type="loading" className={styles.loading} size="lg" />
          :
          (
            <div>
              <form>
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
                <div className={styles.content} style={{ marginTop: '20px' }} >联系人号码：{detailData.mobile}</div>
                <div className={styles.content}>
                  <Picker data={dealType} cols={1} {...getFieldProps('dealstatus')}>
                    <ListItem style={{ padding: 0 }} arrow="horizontal" className={styles.dealType}>处理状态</ListItem>
                  </Picker>
                </div>
                <div className={styles.content}>
                  创建时间：{moment(detailData.createtime).format('YYYY-MM-DD hh:mm:ss')}
                </div>
                <div className={styles.content} style={{ paddingTop: 10 }}>处理详情</div>
                {detailData.deals.map(item => (
                  <div key={item.createtime} style={{ paddingLeft: '8%', paddingBottom: 5, paddingRight: '5%' }}>
                    {item.detail}
                  </div>
                ))}
                <WingBlank size="lg">
                  <Card>
                    <Card.Body style={{ padding: 0 }}>
                      {/* <div>{detailData.content}</div> */}
                      <TextareaItem
                        {...getFieldProps('dealcontent')}
                        rows={3}
                        style={{ fontSize: '14px', marginTop: '0px', paddingTop: '0px' }}
                        placeholder="点击输入处理详情"
                      />
                    </Card.Body>
                  </Card>
                </WingBlank>
              </form>
              <Button type="default" onClick={this.onSubmit} className={styles.button}>提交</Button>
              <Modal
                visible={flag}
                transparent
                maskClosable={false}
                onClose={this.onClose}
                title="提交更新"
                footer={[{ text: '确定', onPress: () => { this.onClose(); } }]}
              >
                <div style={{ height: 20 }}>
                  { status === 0 ? '数据更新成功' : '数据提交失败，请重试！'}
                </div>
              </Modal>
            </div>
          )
        }

      </div>
    );
  }
}

const StaffOrderDetailBasic = createForm()(StaffOrderDetail);
export default StaffOrderDetailBasic;
