export const wxCode = 'wxCode';

export const workOrderList = {
  status: 0,
  message: '提交成功',
  data: {
    list: [
      {
        orderid: '1',
        type: '0',
        mobile: '13425679876',
        phonenumber: '02167129872',
        detail: '故障类型1',
        dealStatus: '待处理',
        content: '张三丰处理',
        pictures: [{
          url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
          id: '2121',
        }, {
          url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
          id: '2122',
        }],
        createtime: '2018-09-20 11:20:30',
        orderstatus: 'test1',
      },
      {
        orderid: '2',
        type: '1',
        mobile: '13425679876',
        phonenumber: '02167129873',
        detail: '故障类型2',
        dealStatus: '待处理',
        content: '测试员处理',
        pictures: [{
          url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
          id: '2121',
        }, {
          url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
          id: '2122',
        }],
        createtime: '2018-09-20 11:20:30',
        orderstatus: 'test2',
      },
      {
        orderid: '3',
        type: '2',
        mobile: '13425679876',
        phonenumber: '02167129874',
        detail: '故障类型3',
        dealStatus: '已处理',
        content: '研发员处理',
        pictures: [{
          url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
          id: '2121',
        }, {
          url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
          id: '2122',
        }],
        createtime: '2018-09-20 11:20:30',
        orderstatus: 'test3',
      },
    ],
  },
};

export const bindTerminal = {
  status: 0,
  message: '发送请求成功',
  data: {
    openid: '1000',
    mobile: '12230004444',
    phonenumber: '0213456789',
    pnp: '5533',
    groupname: '上海禹为通信技术有限公司',
    username: '张三',
    bindTime: '2018-05-25 10:11:11',
  },
};

export const numberBindList = {
  status: 0,
  message: '提交成功',
  data: {
    list: [
      {
        binderid: '1',
        binder: '张三丰',
        mobile: '13425679876',
        phonenumber: '02167129872',
        bindTime: '2018-09-20 11:20:30',
      },
      {
        binderid: '2',
        binder: '李天',
        mobile: '13425679876',
        phonenumber: '02167129872',
        bindTime: '2018-09-20 11:20:30',
      },
      {
        binderid: '3',
        binder: '测试',
        mobile: '13425679876',
        phonenumber: '02167129872',
        bindTime: '2018-09-20 11:20:30',
      },
    ],
  },
};

export const numberList = {
  status: 0,
  message: '提交成功',
  data: {
    list: [
      {
        numberId: '1',
        binder: '张三丰',
        mobile: '13425679876',
        phonenumber: '02167129872',
        bindTime: '2018-06-01 10:11:09',
        orderedBusiness: [{
          businessid: 1,
          business: '已订购补充业务1',
        },
        {
          businessid: 2,
          business: '已订购补充业务2',
        },
        {
          businessid: 3,
          business: '已订购补充业务3',
        }],
        toOrderedBusiness: [{
          businessid: 4,
          business: '可订购补充业务4',
        },
        {
          businessid: 5,
          business: '可订购补充业务5',
        },
        {
          businessid: 6,
          business: '可订购补充业务6',
        }],
        history: [
          {
            binderid: '1',
            binder: '张三丰',
            mobile: '13425679876',
            phonenumber: '02167129872',
            bindTime: '2018-09-20 11:20:30',
          },
          {
            binderid: '2',
            binder: '李天',
            mobile: '13425679876',
            phonenumber: '02167129873',
            bindTime: '2018-09-20 11:20:30',
          },
          {
            binderid: '3',
            binder: '测试',
            mobile: '13425679876',
            phonenumber: '02167129874',
            bindTime: '2018-09-20 11:20:30',
          },
        ],
      },
      {
        numberId: '2',
        binder: '李天',
        mobile: '13425679877',
        phonenumber: '02167129873',
        bindTime: '2018-06-01 10:11:10',
        orderedBusiness: [{
          businessid: 7,
          business: '已订购补充业务7',
        },
        {
          businessid: 8,
          business: '已订购补充业务8',
        },
        {
          businessid: 9,
          business: '已订购补充业务9',
        }],
        toOrderedBusiness: [{
          businessid: 10,
          business: '可订购补充业务10',
        },
        {
          businessid: 11,
          business: '可订购补充业务11',
        },
        {
          businessid: 12,
          business: '可订购补充业务12',
        }],
        history: [],
      },
      {
        numberId: '3',
        binder: '测试',
        mobile: '13425679878',
        phonenumber: '02167129874',
        bindTime: '2018-06-01 10:11:11',
        orderedBusiness: [{
          businessid: 13,
          business: '已订购补充业务13',
        },
        {
          businessid: 14,
          business: '已订购补充业务14',
        },
        {
          businessid: 15,
          business: '已订购补充业务15',
        }],
        toOrderedBusiness: [{
          businessid: 16,
          business: '可订购补充业务16',
        },
        {
          businessid: 17,
          business: '可订购补充业务17',
        },
        {
          businessid: 18,
          business: '可订购补充业务18',
        }],
        history: [],
      },
    ],
  },
};

export const faultType = [
  {
    label: '网络类',
    value: 1,
  },
  {
    label: '配置类',
    value: 2,
  },
  {
    label: '平台类',
    value: 3,
  },
  {
    label: 'VPN类',
    value: 4,
  },
  {
    label: '使用类',
    value: 5,
  },
  {
    label: '其他',
    value: 100,
  },
];

export const dealType = [
  {
    label: '未处理',
    value: 1,
  },
  {
    label: '已分配',
    value: 2,
  },
  {
    label: '正在处理',
    value: 3,
  },
  {
    label: '已处理',
    value: 100,
  },
];
