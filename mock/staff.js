export const login = {
  status: 0,
  message: '登陆成功',
  data: {
    staffid: 1,
    staffname: '章三',
    department: '工程部',
    mobile: '15002168836',
    rank: 1,
    createtime: '2018-06-14 09:53:23',
  },
};

export const staffWorkOrderList = {
  status: 0,
  message: '提交成功',
  data: {
    list: [
      {
        id: 29,
        orderid: 'STY20180613000029',
        type: 100,
        mobile: '13425679876',
        phonenumber: '02167129872',
        phonetype: 'yealink-t49g',
        dealflag: 1,
        detail: '呼出受限',
        subject: '报障工单',
        pictures: [{
          url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
          id: '2121',
        }, {
          url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
          id: '2122',
        }],
        createtime: '2018-09-20 11:20:30',
        updatetime: '2018-09-20 11:30:30',
        staffid: 1,
        staffname: '章三',
        groupname: '禹为测试',
        validflag: 1,
      },
      {
        id: 30,
        orderid: 'STY20180613000030',
        type: 100,
        mobile: '13425679870',
        phonenumber: '02167129872',
        phonetype: 'yealink-t49g',
        dealflag: 3,
        detail: '待处理',
        subject: '报障工单',
        pictures: [{
          url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
          id: '2121',
        }, {
          url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
          id: '2122',
        }],
        createtime: '2018-09-20 11:24:30',
        updatetime: '2018-09-20 11:35:30',
        staffid: 1,
        staffname: '章三1',
        groupname: '禹为测试',
        validflag: 1,
      },
      {
        id: 31,
        orderid: 'STY20180613000031',
        type: 100,
        mobile: '13425679871',
        phonenumber: '02167129872',
        phonetype: 'yealink-t49g',
        dealflag: 2,
        detail: '正在处理',
        subject: '报障工单',
        pictures: [{
          url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
          id: '2121',
        }, {
          url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
          id: '2122',
        }],
        createtime: '2018-09-20 11:02:30',
        updatetime: '2018-09-20 11:03:30',
        staffid: 1,
        staffname: '章三2',
        groupname: '禹为测试',
        validflag: 1,
      },
    ],
    pagination: {
      total: 3,
      pagesize: 1,
      currentpage: 1,
    },
  },
};

export const updateStafforder = {
  status: 0,
  message: '更新成功',
  data: {},
};
