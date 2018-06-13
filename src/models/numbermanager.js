import { getNumberBindList } from '../services/deviceManager';

export default {
  namespace: 'numbermanager',
  state: {
    status: 1,
    meassage: '',
    data: {},
  },
  effects: {
    *getNumberBindList({ payload }, { call, put }) {
      const response = yield call(getNumberBindList, payload);
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
