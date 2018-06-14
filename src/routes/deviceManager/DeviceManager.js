import React, { Component } from 'react';
import { connect } from 'dva';
import { NavBar, Button, Icon } from 'antd-mobile';
import styles from './deviceManager.less';
import { getQueryStrFromUrl } from '../../utils/utils';

@connect(({
  user,
  devicemanager,
  weichat,
}) => ({
  user,
  devicemanager,
  weichat,
}))
class DeviceManager extends Component {
  componentDidMount() {
    this.queryBindTerminal();
  }
  queryBindTerminal() {
    const {
      dispatch,
      // weichat: {
      //   data: {
      //     openid,
      //   },
      // },
    } = this.props;
    const code = getQueryStrFromUrl('code');
    const userCode = localStorage.getItem('userCode');
    if (userCode || code) {
      if (userCode) {
        console.log(11111);
        dispatch({
          type: 'weichat/getUserInfo',
          payload: { code: userCode },
        }).then(() => {
          const { weichat: { data: { openid } } } = this.props;
          dispatch({
            type: 'devicemanager/getBindTerminal',
            payload: { openid },
          });
        });
      } else {
        localStorage.setItem('userCode', code);
        console.log(222222);
        dispatch({
          type: 'weichat/getUserInfo',
          payload: { code },
        }).then(() => {
          const { weichat: { data: { openid } } } = this.props;
          dispatch({
            type: 'devicemanager/getBindTerminal',
            payload: { openid },
          });
        });
      }
    } else {
      const backurl = window.document.location.href;
      dispatch({
        type: 'weichat/getAuthorizeURLFroWebsite',
        payload: { backurl },
      });
    }
  }
  unbindDevice() {
    const {
      dispatch,
      devicemanager: {
        data: {
          mobile,
        },
      },
      user: {
        data: {
          openid,
        },
      },
    } = this.props;
    dispatch({
      type: 'devicemanager/unBind',
      payload: { openid, mobile },
    });
  }
  scan() {
    const {
      dispatch,
      user: {
        data: {
          openid,
        },
      },
    } = this.props;
    dispatch({
      type: 'devicemanager/scan',
      payload: { openid },
    });
  }
  back = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/back',
      payload: '',
    });
  };
  renderUnbind() {
    const { devicemanager: { data: { phonenumber, mobile } } } = this.props;

    return (
      <div>
        <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={this.back} className={styles.navbar}>终端管理</NavBar>
        <p className={styles.content}>您的固定电话号码是{phonenumber}</p>
        <p className={styles.content}>您已经绑定了号码{mobile}</p>
        <Button type="default" className={styles.button} onClick={() => this.unbindDevice()}>解绑</Button>
      </div>
    );
  }

  renderScan() {
    return (
      <div>
        <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={this.back} className={styles.navbar}>终端管理</NavBar>
        <Button className={styles.button} onClick={() => this.scan()}>扫一扫</Button>
      </div>
    );
  }

  render() {
    const {
      devicemanager: {
        status,
        data: {
          mobile,
        },
      },
    } = this.props;
    return (
      <div>
        { (status === 1) ? <Icon type="loading" className={styles.loading} size="lg" /> : (mobile ? this.renderUnbind() : this.renderScan()) }
      </div>
    );
  }
}

export default DeviceManager;
