import React, { Component } from 'react';
import { List } from 'antd-mobile';
import styles from './numberManager.less';
import NumberBind from './NumberBind';

const ListItem = List.Item;
const ListBrief = ListItem.Brief;
class NumberBindList extends Component {
  render() {
    const { datalist } = this.props;
    if (datalist && datalist.length > 0) {
      return (
        <List>
          {
          datalist.map(item => (
            <ListItem key={item.binderid}>
              <ListBrief>
                <NumberBind
                  binder={item.binder}
                  mobile={item.mobile}
                  phonenumber={item.phonenumber}
                  bindTime={item.bindTime}
                />
              </ListBrief>
            </ListItem>
          ))
        }
        </List>
      );
    } else {
      return (
        <div className={styles.nolist}>此话机没有绑定记录</div>
      );
    }
  }
}

export default NumberBindList;
