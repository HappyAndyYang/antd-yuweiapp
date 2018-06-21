import React, { Component } from 'react';
import { List } from 'antd-mobile';
import moment from 'moment';
import styles from './staffWorkOrder.less';
import StaffWorkOrder from './StaffWorkOrder';
import { faultType, dealType } from '../../../mock/api';

const ListItem = List.Item;
const ListBrief = ListItem.Brief;
class StaffOrderList extends Component {
  render() {
    const { dispatch, datalist } = this.props;
    // const t = new Date('2018-06-12T08:46:33.000Z');
    // const s = '2018-06-12T08:46:33.000Z';
    // console.log(moment(new Date()).format('YYYY-MM-DD hh:mm:ss'));
    // console.log(new Date());
    // console.log(t);
    // console.log(moment(t).format('YYYY-MM-DD hh:mm:ss'));
    if (datalist && datalist.length > 0) {
      return (
        <List>
          {
          datalist.map(item => (
            <ListItem key={item.orderid}>
              <ListBrief>
                <StaffWorkOrder
                  dispatch={dispatch}
                  orderid={item.orderid}
                  type={(faultType.find(faultItem => faultItem.value === item.type).label)}
                  orderstatus={
                    (dealType.find(dealItem => dealItem.value === item.dealstatus).label)
                  }
                  createtime={moment(item.createtime).format('YYYY-MM-DD hh:mm:ss')}
                />
              </ListBrief>
            </ListItem>
          ))
        }
        </List>
      );
    } else {
      return (
        <div className={styles.nolist}>您暂时没有工单</div>
      );
    }
  }
}

export default StaffOrderList;
