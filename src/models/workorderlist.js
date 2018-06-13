import { routerRedux } from 'dva/router';
import { getWorkOrderList } from '../services/deviceManager';

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
  },
  effects: {
    *getWorkOrderList({ payload }, { call, put, select }) {
      const response = yield call(getWorkOrderList, payload);
      const list = yield select(state => state.workorderlist.data.list);
      list.push(...response.data.list);
      console.log(payload);
      console.log(response);
      if (response.status === 0) {
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
      }
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
