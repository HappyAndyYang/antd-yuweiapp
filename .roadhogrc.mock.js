import mockjs from 'mockjs';
import { format, delay } from 'roadhog-api-doc';
import { wxCode, workOrderList, bindTerminal, numberBindList, numberList } from './mock/api';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';
// console.log(noProxy);
// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // GET POST 可省略
  // 'DELETE /syt/bindTerminal': (req, res) => {
  //   res.send({ message: 'OK', status: 0, data: {} });
  // },
  // 'DELETE /api/v1/syt/bindTerminal': 'http://101.132.159.46:3001',
  'DELETE /api/v1/syt/bindTerminal': 'https://vcom.club:3010',
  // 'POST /syt/bindTerminal': {
  //   $desc: "绑定终端",
  //   $params: {
  //     openid: {
  //       desc: 'openid',
  //       exp: 10000,
  //     },
  //   },
  //   $body: bindTerminal,
  // },
  // 'POST /api/v1/syt/bindTerminal': 'http://101.132.159.46:3001',
  'POST /api/v1/syt/bindTerminal': 'https://vcom.club:3010',
  // 'GET /api/v1/wx/userInfo/code' : wxCode,
  'GET /api/v1/wx/userInfo/code' : 'https://vcom.club:3010',
  // 'GET /syt/bindTerminal' : {
  //   $desc: "获取绑定终端",
  //   $params: {
  //     openid: {
  //       desc: 'openid',
  //       exp: 10000,
  //     },
  //   },
  //   $body: bindTerminal,
  // },
  // 'GET /api/v1/syt/bindTerminal' : 'http://101.132.159.46:3001',
  'GET /api/v1/syt/bindTerminal' : 'https://vcom.club:3010',
  // 'GET /scan' : (req, res) => {
  //   res.send({
  //     status: 0,
  //     message: '发送请求成功',
  //     data: {
  //       deviceName: '设备X',
  //       mac: '1001',
  //     }
  //   });
  // },
  // 'GET /api/v1/scan': 'http://101.132.159.46:3001',
  'GET /api/v1/scan': 'https://vcom.club:3010',
  // 'POST /syt/login': (req, res) => {
  //   res.send({
  //     status: 0,
  //     message: '登录成功！',
  //     data: {},
  //   });
  // },
  // 'POST /api/v1/syt/login': 'http://101.132.159.46:3001',
  'POST /api/v1/syt/login': 'https://vcom.club:3010',
  'POST /api/v1/syt/logout': (req, res) => {
    res.send({
      status: 0,
      message: '退出成功',
      data: {},
    });
  },
  // 'POST /faultorder': (req, res) => {
  //   res.send({
  //     status: 0,
  //     message: '提交成功',
  //     data: {},
  //   });
  // },
  // 'POST /api/v1/faultorder': 'http://101.132.159.46:3001',
  'POST /api/v1/faultorder': 'https://vcom.club:3010',
  // 'GET /workorder': {
  //   $desc: "获取工单列表",
  //   $params: {},
  //   $body: workOrderList,
  // },
  // 'GET /api/v1/faultorder': 'http://101.132.159.46:3001',
  'GET /api/v1/faultorder': 'https://vcom.club:3010',
  //上传图片
  // 'GET /api/v1/faultorder/uploadpic': 'http://101.132.159.46:3001',
  'GET /api/v1/faultorder/uploadpic': 'https://vcom.club:3010',
  // 'GET /numberManager/numberBindList': {
  //   $desc: "获取绑定号码列表",
  //   $params: {},
  //   $body: numberList,
  // },
  // 'GET /api/v1/numberManager/numberBindList': 'http://101.132.159.46:3001',
  'GET /api/v1/numberManager/numberBindList': 'https://vcom.club:3010',
  // 'GET /api/numberManager/numberBindList': numberList,
  //获取短信验证码
  // 'POST /api/v1/sms/getSmsAuthCode': 'http://101.132.159.46:3001',
  'POST /api/v1/sms/getSmsAuthCode': 'https://vcom.club:3010',
  //验证短信验证码
  // 'POST /api/v1/sms/verifiSmsAuthCode': 'http://101.132.159.46:3001',
  'POST /api/v1/sms/verifiSmsAuthCode': 'https://vcom.club:3010',
  'GET /api/v1/wx/getAuthorizeURLForWebsite': 'https://vcom.club:3010',
};

export default noProxy ? {} : delay(proxy, 1000);
