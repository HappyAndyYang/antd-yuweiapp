import { getSmsAuthCode, verifiSmsAuthCode } from '../services/basic';

export default {
  namespace: 'sms',
  state: {
    getSmsAuthCode: {},
    verifiSmsAuthCode: {},
  },

  effects: {
    *getSmsAuthCode({ payload }, { call, put }) {
      const response = yield call(getSmsAuthCode, payload);
      // console.log(response);
      yield put({
        type: 'saveGetsmsCode',
        payload: response,
      });
    },
    *verifiSmsAuthCode({ payload }, { call, put }) {
      const response = yield call(verifiSmsAuthCode, payload);
      yield put({
        type: 'saveVerify',
        payload: response,
      });
    },
  },
  reducers: {
    saveGetsmsCode(state, action) {
      return {
        ...state,
        verifiSmsAuthCode: {
          data: action.payload,
        },
      };
    },
    saveVerify(state, action) {
      return {
        ...state,
        getSmsAuthCode: {
          data: action.payload,
        },
      };
    },
  },
};
