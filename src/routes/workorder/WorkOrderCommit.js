import React, { Component } from 'react';
import { NavBar, Button, List, InputItem, TextareaItem, ImagePicker, Icon, Picker, Flex, Modal } from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from 'dva';
// import { routerRedux } from 'dva/router';
import lrz from 'lrz';
import Promise from 'bluebird';
import { faultType } from '../../../mock/api';
import styles from '../deviceManager/deviceManager.less';

const ListItem = List.Item;
@connect(({
  workordercommit,
  user,
  login,
  loading,
}) => ({
  workordercommit,
  user,
  login,
  loading: loading.effects['workordercommit/upload'],
}))
class WorkOrderCommit extends Component {
  onChange = (files, type, index) => {
    const { dispatch, workordercommit: { upload: { urls, status } } } = this.props;
    if (type === 'remove' && urls.length > index) {
      urls.splice(index, 1);
      status.splice(index, 1);
    }
    const changeData = {
      files,
      urls,
      status,
    };
    dispatch({
      type: 'workordercommit/change',
      payload: changeData,
    });
  }
  onSubmit = () => {
    const {
      dispatch,
      workordercommit: {
        upload: { urls },
      },
    } = this.props;
    const { data: { userid, username, groupname } } = JSON.parse(localStorage.login);
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        const { phonenumber, detail } = this.props.form.getFieldsValue();
        const mobile = this.props.form.getFieldsValue().mobile &&
          this.props.form.getFieldsValue().mobile.replace(/\s+/g, '');
        const type = this.props.form.getFieldsValue().type &&
          this.props.form.getFieldsValue().type[0];
        dispatch({
          type: 'workordercommit/commit',
          payload: { phonenumber, type, mobile, detail, urls, username, userid, groupname },
        });
      } else {
        alert('登陆失败');
      }
    });
  };
  onClose = () => {
    const {
      dispatch,
    } = this.props;
    dispatch({
      type: 'workordercommit/onclose',
    });
  };
  upload = () => {
    const { dispatch, workordercommit: { data: { pictures } } } = this.props;
    const imgs = Promise.all(pictures.map(async (item) => {
      // 图片大图1000kb进行压缩
      if (item.file.size > 1024000) {
        const imgData = await lrz(item.url, { quality: 0.1 });
        return { imgData: imgData.base64 };
      } else {
        const imgData = { imgData: item.url };
        return imgData;
      }
    }));
    imgs.then(data => dispatch({
      type: 'workordercommit/upload',
      payload: data,
    }));
  };
  back = () => {
    const { dispatch } = this.props;
    // dispatch(routerRedux.push('/fault'));
    dispatch({
      type: 'user/back',
    });
  };
  render() {
    const { getFieldProps } = this.props.form;
    const { workordercommit: { data: { pictures }, upload, flag, status }, loading } = this.props;
    const emptyMap = [];
    for (let index = 0; index < 4 - upload.urls.length; index += 1) {
      emptyMap.push(index);
    }
    return (
      <div>
        <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={this.back} className={styles.navbar}>故障报修</NavBar>
        <form>
          <List>
            <InputItem {...getFieldProps('phonenumber')} clear type="number" placeholder="故障号码">故障号码</InputItem>
            <Picker data={faultType} cols={1} {...getFieldProps('type')}>
              <ListItem arrow="horizontal">故障类型</ListItem>
            </Picker>
            <InputItem {...getFieldProps('mobile')} placeholder="联系人号码" type="phone">联系人号码</InputItem>
            <TextareaItem {...getFieldProps('detail')} rows={5} placeholder="故障详情描述" />
            <ListItem>
              <ImagePicker
                files={pictures}
                onChange={this.onChange}
                selectable={pictures.length < 4}
                multiple="true"
                accept="image/gif,image/jpeg,image/jpg,image/png"
              />
              <Flex justify="center">
                {upload.status.map((item, index) => (
                  <Flex.Item key={upload.urls[index]} style={{ textAlign: 'center' }}>
                    {item === 0 ?
                      <Icon style={{ color: 'green' }} size="xs" type="check-circle-o" />
                      :
                      <Icon style={{ color: 'red' }} type="cross-circle-o" />}
                  </Flex.Item>
                ))}
                {emptyMap.map(item => <Flex.Item key={item} />)}
              </Flex>
              <Button size="small" style={{ width: '30%', border: '1px solid #000000' }} onClick={this.upload} loading={loading}>上传</Button>
            </ListItem>
          </List>
        </form>
        <Button type="default" onClick={this.onSubmit} className={styles.button}>提交</Button>
        <Modal
          visible={flag}
          transparent
          maskClosable={false}
          onClose={this.onClose}
          title="提交更新"
          footer={[{ text: '确定', onPress: () => { this.onClose(); } }]}
          // wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <div style={{ height: 20 }}>
            { status === 0 ? '数据更新成功' : '数据提交失败，请重试！'}
          </div>
        </Modal>
      </div>
    );
  }
}

const WorkOrderCommitBasic = createForm()(WorkOrderCommit);
export default WorkOrderCommitBasic;
