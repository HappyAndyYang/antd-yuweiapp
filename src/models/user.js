import { routerRedux } from 'dva/router';
import { getUserInfo } from '../services/basic';

export default {
  namespace: 'user',
  state: {
    status: 0,
    meassage: '',
    data: {
      openid: '10003',
    },
  },

  effects: {
    *getUserInfo({ payload }, { call, put }) {
      const response = yield call(getUserInfo, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *back(_, { put }) {
      yield put(routerRedux.go(-1));
    },
  },
  reducers: {
    save(state, action) {
      return action.payload;
    },
  },
};
