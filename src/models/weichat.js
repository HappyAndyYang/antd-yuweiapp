// import { routerRedux } from 'dva/router';
import { getAuthorizeURLFroWebsite } from '../services/basic';

export default {
  namespace: 'weichat',
  state: {
    status: 1,
    meassage: '',
    data: {},
  },

  effects: {
    *getAuthorizeURLFroWebsite({ payload }, { call, put }) {
      const response = yield call(getAuthorizeURLFroWebsite, payload);
      console.log(payload);
      console.log(response);
      yield put({
        type: 'save',
        payload: response,
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
  },
};
