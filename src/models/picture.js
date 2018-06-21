import { uploadpic } from '../services/deviceManager';

export default {
  namespace: 'picture',
  state: {
    status: 0,
    meassage: '',
    data: {},
  },
  effects: {
    *upload({ payload }, { call, put, all }) {
      // console.log(payload);
      const img = payload.map(item => call(uploadpic, item));
      // const response = yield call(uploadpic, payload);
      const response = yield all(img);
      // console.log(response);
      const urls = [];
      response.forEach((item) => { if (item.data) urls.push(item.data.url); });
      yield put({
        type: 'save',
        payload: { urls },
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
