import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import { NavBar, Icon, Card, WingBlank, WhiteSpace, Tabs, List } from 'antd-mobile';
import { connect } from 'dva';
import styles from '../deviceManager/deviceManager.less';

const ListItem = List.Item;
const ListBrief = ListItem.Brief;
const tabs = [
  { title: <div>已订购补充业务</div> },
  { title: <div>可订购补充业务</div> },
];
function HistoryList(props) {
  const { history } = props;
  return (
    <List style={{ marginTop: '10px' }}>
      {
        history.map(item => (
          <ListItem key={item.binderid}>
            <ListBrief>
              <div style={{ color: '#000000', textAlign: 'center', width: '100%' }}>
                <div style={{ width: '50%', float: 'left', textAlign: 'center' }}>{item.mobile}</div>
                <div style={{ width: '50%', textAlign: 'center' }}>{item.bindTime}</div>
              </div>
            </ListBrief>
          </ListItem>
        ))
      }
    </List>
  );
}
@connect(({ numbermanager, user }) => ({ numbermanager, user }))
class NumberDetail extends Component {
  back = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/back',
      payload: '',
    });
  };
  more(phonenumber) {
    const { dispatch } = this.props;
    dispatch(routerRedux.push(`/numbermanager/history/${phonenumber}`));
  }
  render() {
    const {
      match: {
        params: {
          numberId,
        },
      },
      numbermanager: {
        data: {
          list,
        },
      },
    } = this.props;
    const detailData = list ? list.find(item => item.numberId === numberId) : [];
    const {
      phonenumber,
      orderedBusiness,
      toOrderedBusiness,
      history,
    } = detailData;
    return (
      <div>
        <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={this.back} className={styles.navbar} >
          {phonenumber}
        </NavBar>
        <WhiteSpace size="lg" />
        <WingBlank size="lg">
          <Card>
            <Card.Body>
              当前绑定人员： {detailData.binder}<div style={{ marginTop: '10px' }} />
              当前绑定手机： {detailData.mobile}<div style={{ marginTop: '10px' }} />
              绑定时间： {detailData.bindTime}<div />
            </Card.Body>
          </Card>
          <Tabs tabs={tabs} initialPage={0} tabBarPosition="top">
            <div>
              {
                orderedBusiness ? orderedBusiness.map((item) => {
                  return (<div key={item.businessid} style={{ marginTop: '10px', marginLeft: '8%' }}>{item.business}</div>);
                }) : null
            }
            </div>
            <div>
              {
                toOrderedBusiness ? toOrderedBusiness.map((item) => {
                  return (<div key={item.businessid} style={{ marginTop: '10px', marginLeft: '8%' }}>{item.business}</div>);
                }) : null
              }
            </div>
          </Tabs>
          <WhiteSpace size="lg" />
          <div>
            <div style={{ float: 'right', marginRight: '5%' }}>
              <Icon type="ellipsis" size="xs" onClick={() => this.more(phonenumber)} />
            </div>
            <div className={styles.content} style={{ textAlign: 'center', fontSize: '16px', marginTop: '10px' }} >历史绑定记录</div>
          </div>
          { (history && history.length > 0) ?
            <HistoryList history={history} />
              :
            <div style={{ marginTop: '30px', textAlign: 'center' }}>此号码暂时没有绑定记录</div>
          }
        </WingBlank>
      </div>
    );
  }
}

export default NumberDetail;
