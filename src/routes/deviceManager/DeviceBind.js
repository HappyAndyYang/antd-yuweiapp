import React, { Component } from 'react';
import { connect } from 'dva';
import { NavBar, Button, InputItem, List, Icon, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from './deviceManager.less';

const ListItem = List.Item;

@connect(({ devicemanager, user, sms }) => ({ devicemanager, user, sms }))
class DeviceBind extends Component {
  state = {
    timeslice: 60,
    content: '获取验证码',
  };
  onSubmit = () => {
    const {
      dispatch,
      devicemanager: {
        scan: {
          data: {
            deviceName,
            mac,
            phoneType,
          },
        },
      },
      sms: {
        verifiSmsAuthCode: {
          data: { status },
        },
      },
    } = this.props;
    const { data: { openid } } = JSON.parse(localStorage.weichatInfo);
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        const { verifyCode } = this.props.form.getFieldsValue();
        const authCode = verifyCode;
        const mobile = this.props.form.getFieldsValue().mobile.replace(/\s+/g, '');
        dispatch({
          type: 'sms/verifiSmsAuthCode',
          payload: { mobile, authCode },
        });
        if (status === 0) {
          dispatch({
            type: 'devicemanager/bind',
            payload: { openid, deviceName, mac, mobile, verifyCode, phoneType },
          });
        } else {
          Toast.info('获取验证码失败，请重新获取！', 1);
        }
      } else {
        alert('绑定失败');
      }
    });
  }
  getVerifyCode = () => {
    const { dispatch } = this.props;
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error && this.props.form.getFieldsValue().mobile) {
        const mobile = this.props.form.getFieldsValue().mobile.replace(/\s+/g, '');
        const interval = setInterval(() => {
          let t = this.state.timeslice - 1;
          let c = `${t}秒重试`;
          if (this.state.timeslice <= 0) {
            t = 60;
            c = '获取验证码';
            clearInterval(interval);
          }
          this.setState({ timeslice: t, content: c });
        }, 1000);
        dispatch({
          type: 'sms/getSmsAuthCode',
          payload: { mobile },
        });
      } else {
        alert('获取验证码失败');
      }
    });
  };
  back = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/back',
      payload: '',
    });
  };
  render() {
    const { getFieldProps } = this.props.form;
    const {
      devicemanager: {
        scan: {
          data: {
            deviceName,
            mac,
          },
        },
      },
    } = this.props;
    return (
      <div>
        <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={this.back} className={styles.navbar}>终端管理</NavBar>
        <form>
          <List>
            <ListItem><p style={{ whiteSpace: 'pre' }}>{deviceName}    Mac：{mac}</p></ListItem>
            <InputItem
              {...getFieldProps('mobile')}
              clear
              type="phone"
              placeholder="手机号码"
              extra={
                <Button
                  type="default"
                  size="small"
                  inline
                  onClick={this.getVerifyCode}
                  style={{ width: '97px', height: '21px', lineHeight: '21px' }}
                >
                  {this.state.content}
                </Button>}
            >
              手机号码
            </InputItem>
            <InputItem {...getFieldProps('verifyCode')} placeholder="验证码" type="number"> 验证码 </InputItem>
          </List>
        </form>
        <Button type="default" onClick={this.onSubmit} className={styles.button}>绑定</Button>
      </div>
    );
  }
}

const DeviceManagerBasic = createForm()(DeviceBind);
export default DeviceManagerBasic;
