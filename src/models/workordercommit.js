// import { routerRedux } from 'dva/router';
import { commitWorkOrder, uploadpic } from '../services/deviceManager';

export default {
  namespace: 'workordercommit',
  state: {
    status: 0,
    meassage: '',
    data: {
      pictures: [],
    },
    upload: {
      urls: [],
      status: [],
    },
    flag: false,
  },
  effects: {
    *commit({ payload }, { call, put, select }) {
      const pictures = yield select(state => state.workordercommit.data.pictures);
      const response = yield call(commitWorkOrder, payload);
      response.data = { pictures };
      response.flag = true;
      // console.log(payload);
      // console.log(response);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *onclose(_, { put }) {
      yield put({
        type: 'save',
        payload: {
          flag: false,
          upload: {
            urls: [],
            status: [],
          },
          data: {
            pictures: [],
          },
        },
      });
    },
    *change({ payload }, { put }) {
      const { files, urls, status } = payload;
      yield put({
        type: 'savePic',
        payload: files,
      });
      yield put({
        type: 'saveUrl',
        payload: { urls, status },
      });
    },
    *upload({ payload }, { call, put, all }) {
      // console.log(payload);
      const img = payload.map(item => call(uploadpic, item));
      // const response = yield call(uploadpic, payload);
      const response = yield all(img);
      // console.log(response);
      const uploadRes = {
        urls: [],
        status: [],
      };
      response.forEach((item) => {
        if (item.data) uploadRes.urls.push(item.data.url);
        uploadRes.status.push(item.status);
      });
      yield put({
        type: 'save',
        payload: { upload: uploadRes },
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
    savePic(state, action) {
      return {
        ...state,
        data: {
          pictures: action.payload,
        },
      };
    },
    saveUrl(state, action) {
      // console.log('saveUrl');
      // console.log(action.payload);
      return {
        ...state,
        upload: action.payload,
      };
    },
  },
};
