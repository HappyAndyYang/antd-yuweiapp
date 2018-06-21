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
    *commit({ payload }, { call, put }) {
      const response = yield call(commitWorkOrder, payload);
      // console.log(payload);
      // console.log(response);
      yield put({
        type: 'save',
        payload: response,
      });
      const urls = [];
      const status = [];
      yield put({
        type: 'saveUrl',
        payload: { urls, status },
      });
      // if (response.status === 0) {
      //   yield put(routerRedux.push('/fault'));
      // }
      yield put({
        type: 'saveFlag',
        payload: true,
      });
    },
    *onclose(_, { put }) {
      yield put({
        type: 'saveFlag',
        payload: false,
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
      console.log(response);
      const uploadRes = {
        urls: [],
        status: [],
      };
      response.forEach((item) => {
        if (item.data) uploadRes.urls.push(item.data.url);
        uploadRes.status.push(item.status);
      });
      yield put({
        type: 'saveUpload',
        payload: { upload: uploadRes },
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
        data: {
          pictures: [],
        },
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
    saveUpload(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    saveFlag(state, action) {
      return {
        ...state,
        flag: action.payload,
      };
    },
  },
};
