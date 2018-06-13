import { routerRedux } from 'dva/router';
import { unBindTerminal, bindTerminal, getBindTerminal, scan } from '../services/deviceManager';

export default {
  namespace: 'devicemanager',
  state: {
    status: 1,
    meassage: '',
    data: {},
    scan: {
      data: {
        deviceName: 'deviceName',
        mac: '000B82A06005',
        phoneType: 'grandstream_gxp1625',
      },
    },
  },

  effects: {
    *getBindTerminal({ payload }, { call, put }) {
      const response = yield call(getBindTerminal, payload);
      console.log(payload);
      console.log(response);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *unBind({ payload }, { call, put }) {
      const response = yield call(unBindTerminal, payload);
      console.log(payload);
      console.log(response);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *bind({ payload }, { call, put }) {
      console.log(payload);
      const response = yield call(bindTerminal, payload);
      console.log(response);
      yield put({
        type: 'save',
        payload: response,
      });
      if (response.status === 0) {
        yield put(routerRedux.push('/unbind'));
      }
    },
    *scan({ payload }, { call, put }) {
      const response = yield call(scan, payload);
      console.log(payload);
      console.log(response);
      yield put({
        type: 'saveScan',
        payload: response,
      });
      yield put(routerRedux.push('/bind'));
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    saveScan(state, action) {
      return {
        ...state,
        scan: { ...action.payload },
      };
    },
  },
};
