import { routerRedux } from 'dva/router';
import { getWorkOrderList, getWorkOrderInfo } from '../services/deviceManager';

export default {
  namespace: 'workorderlist',
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
    detail: {
      status: 1,
    },
  },
  effects: {
    *getWorkOrderList({ payload }, { call, put, select }) {
      const response = yield call(getWorkOrderList, payload);
      const list = yield select(state => state.workorderlist.data.list);
      list.push(...response.data.list);
      // console.log(payload);
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
    *getWorkOrderDetail({ payload }, { call, put }) {
      console.log(payload);
      const response = yield call(getWorkOrderInfo, payload);
      console.log(response);
      const data = {};
      data.detail = response;
      console.log(data);
      yield put({
        type: 'save',
        payload: data,
      });
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
    *addWorkOrder(_, { put }) {
      yield put(routerRedux.push('/fault/commit'));
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
