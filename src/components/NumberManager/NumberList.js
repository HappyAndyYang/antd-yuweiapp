import React, { Component } from 'react';
import { List } from 'antd-mobile';
import styles from './numberManager.less';
import Number from './Number';

const ListItem = List.Item;
const ListBrief = ListItem.Brief;
class NumberList extends Component {
  render() {
    const { dispatch, datalist } = this.props;
    if (datalist && datalist.length > 0) {
      return (
        <List>
          {
          datalist.map(item => (
            <ListItem key={item.numberId}>
              <ListBrief>
                <Number
                  dispatch={dispatch}
                  data={item}
                />
              </ListBrief>
            </ListItem>
          ))
        }
        </List>
      );
    } else {
      return (
        <div className={styles.nolist}>您还没有购买号码</div>
      );
    }
  }
}

export default NumberList;
