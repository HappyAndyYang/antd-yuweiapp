import { routerRedux } from 'dva/router';
import { stafflogin, stafflogout } from '../services/deviceManager';

export default {
  namespace: 'stafflogin',
  state: {
    status: 0,
    meassage: '',
    data: {
      staffname: '',
      staffid: '',
    },
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(stafflogin, payload);
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
        localStorage.setItem('stafflogin', str);
        // yield put(routerRedux.push('/staffOrderList'));
        yield put(routerRedux.push('/stafforderlist'));
      }
    },
    *logout({ payload }, { call, put }) {
      // console.log(payload);
      const response = yield call(stafflogout, payload);
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
