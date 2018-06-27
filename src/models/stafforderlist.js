import { routerRedux } from 'dva/router';
import { getStaffOrderList, updateStaffOrder } from '../services/deviceManager';

export default {
  namespace: 'stafforderlist',
  state: {
    status: 1,
    meassage: '',
    data: {
      list: [],
    },
    pagination: {
      total: 0,
      pagesize: 10,
      current: 1,
    },
    updateData: {
      flag: false,
    },
  },
  effects: {
    *getStaffOrderList({ payload }, { call, put, select }) {
      // console.log(payload);
      const response = yield call(getStaffOrderList, payload);
      const list = yield select(state => state.stafforderlist.data.list);
      list.push(...response.data.list);
      // console.log(response);
      if (response.data.list.length !== 0 && response.status === 0) {
        yield put({
          type: 'save',
          payload: {
            status: response.status,
            meassage: response.meassage,
            pagination: {
              total: response.data.pagination.total,
              pagesize: response.data.pagination.pagesize,
              current: response.data.pagination.currentpage,
            },
            data: {
              list,
            },
          },
        });
      } else {
        yield put({
          type: 'save',
          payload: response,
        });
      }
    },
    *commit({ payload }, { call, put }) {
      // console.log(payload);
      const response = yield call(updateStaffOrder, payload);
      response.flag = true;
      // if (response.status === 0) {
      //   response.flag = true;
      // } else {
      //   response.flag = false;
      // }
      // console.log(response);
      yield put({
        type: 'saveUpdate',
        payload: response,
      });
    },
    *onclose(_, { put, select }) {
      const updateData = yield select(state => state.stafforderlist.updateData);
      updateData.flag = false;
      yield put({
        type: 'saveUpdate',
        payload: updateData,
      });
      yield put(routerRedux.goBack());
    },
    *init(_, { put }) {
      const list = [];
      yield put({
        type: 'save',
        payload: {
          status: 1,
          meassage: '',
          pagination: {
            total: 0,
            pagesize: 10,
            current: 1,
          },
          data: {
            list,
          },
        },
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    saveUpdate(state, action) {
      return {
        ...state,
        updateData: action.payload,
      };
    },
  },
};
