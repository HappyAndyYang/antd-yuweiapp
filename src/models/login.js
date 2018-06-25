import { routerRedux } from 'dva/router';
import { login, logout } from '../services/deviceManager';

export default {
  namespace: 'login',
  state: {
    status: 0,
    meassage: '',
    data: {
      username: '',
      userid: '',
      groupname: '',
    },
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
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
        localStorage.setItem('login', str);
        yield put(routerRedux.push('/fault'));
      }
    },
    *logout({ payload }, { call, put }) {
      // console.log(payload);
      const response = yield call(logout, payload);
      // console.log(response);
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
