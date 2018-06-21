// import { routerRedux } from 'dva/router';
import { getAuthorizeURLFroWebsite, getUserInfo } from '../services/basic';

export default {
  namespace: 'weichat',
  state: {
    status: 1,
    meassage: '',
    data: {},
  },

  effects: {
    *getAuthorizeURLFroWebsite({ payload }, { call }) {
      const response = yield call(getAuthorizeURLFroWebsite, payload);
      window.location.href = response.data.url;
    },
    *getUserInfo({ payload }, { call, put }) {
      const response = yield call(getUserInfo, payload);
      // console.log(payload);
      // console.log(response);
      yield put({
        type: 'save',
        payload: response,
      });
      if (response.status === 0) {
        const str = JSON.stringify({
          data: response.data,
          loginTime: new Date(),
        });
        localStorage.setItem('weichatInfo', str);
      }
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
