import React from 'react';
import { Router, Switch, Route } from 'dva/router';
import Dynamic from 'dva/dynamic';

function RouterConfig({ history, app }) {
  const Main = Dynamic({
    app,
    models: () => [],
    component: () => import('./routes/index/Index'),
  });
  const UnBind = Dynamic({
    app,
    models: () => [
      import('./models/user'),
      import('./models/devicemanager'),
      import('./models/weichat'),
    ],
    component: () => import('./routes/deviceManager/DeviceManager'),
  });

  const DeviceManager = Dynamic({
    app,
    models: () => [import('./models/user'), import('./models/devicemanager'), import('./models/sms')],
    component: () => import('./routes/deviceManager/DeviceBind'),
  });

  const Login = Dynamic({
    app,
    models: () => [import('./models/login')],
    component: () => import('./routes/login/Login'),
  });
  const StaffLogin = Dynamic({
    app,
    models: () => [import('./models/stafflogin')],
    component: () => import('./routes/login/StaffLogin'),
  });
  const WorkOrderCommit = Dynamic({
    app,
    models: () => [
      import('./models/workordercommit'),
      import('./models/user'),
      import('./models/picture'),
      import('./models/login'),
    ],
    component: () => import('./routes/workorder/WorkOrderCommit'),
  });
  const WorkOrderList = Dynamic({
    app,
    models: () => [import('./models/workorderlist'), import('./models/user'), import('./models/login')],
    component: () => import('./routes/workorder/WorkOrderList'),
  });
  const WorkOrderDetail = Dynamic({
    app,
    models: () => [import('./models/workorderlist'), import('./models/user')],
    component: () => import('./routes/workorder/WorkOrderDetail'),
  });
  const NumberList = Dynamic({
    app,
    models: () => [import('./models/user'), import('./models/numbermanager')],
    component: () => import('./routes/numberManager/NumberList'),
  });
  const NumberDetail = Dynamic({
    app,
    models: () => [import('./models/user'), import('./models/numbermanager')],
    component: () => import('./routes/numberManager/NumberDetail'),
  });
  const NumberBindHistry = Dynamic({
    app,
    models: () => [import('./models/user'), import('./models/numbermanager')],
    component: () => import('./routes/numberManager/NumberBindHistory'),
  });
  const StaffOrderList = Dynamic({
    app,
    models: () => [import('./models/stafforderlist'), import('./models/stafflogin')],
    component: () => import('./routes/staffOrder/StaffOrderList'),
  });
  const StaffOrderDetail = Dynamic({
    app,
    models: () => [import('./models/stafforderlist'), import('./models/user')],
    component: () => import('./routes/staffOrder/StaffOrderDetail'),
  });

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/unbind" component={UnBind} />
        <Route exact path="/bind" component={DeviceManager} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/stafflogin" component={StaffLogin} />
        <Route exact path="/fault/commit" component={WorkOrderCommit} />
        <Route exact path="/fault" component={WorkOrderList} />
        <Route exact path="/stafforderlist" component={StaffOrderList} />
        <Route exact path="/fault/:orderid" component={WorkOrderDetail} />
        <Route exact path="/staff/:orderid" component={StaffOrderDetail} />
        <Route exact path="/numbermanager" component={NumberList} />
        <Route exact path="/numbermanager/:numberId" component={NumberDetail} />
        <Route exact path="/numbermanager/history/:phonenumber" component={NumberBindHistry} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
