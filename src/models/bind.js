import { unBindTerminal, bindTerminal } from '../services/deviceManager';

export default {
  namespace: 'bind',

  state: {
    openid: 'openid',
    mobile: '18916334938',
    phonenumber: '02155334466',
    pnp: '4466',
    groupname: '上海禹为通信技术有限公司',
    flag: true,
    deviceName: '话机1',
    mac: '00000000',
  },

  effects: {
    *unBind({ payload }, { call, put }) {
      const response = yield call(unBindTerminal, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *Bind({ payload }, { call, put }) {
      console.log(payload);
      const response = yield call(bindTerminal, payload);
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
