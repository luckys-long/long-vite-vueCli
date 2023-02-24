import deviceCenterRoutes from './deviceCenter';
import dailyRecordRoutes from './dailyRecord';

const  monitorCenterRoutes = {
    path: '/monitor',
    component: () => import('@/layout/index.vue'),
    redirect: '/monitor/index',
    meta: {
      title: '监控中心',
      name: 'monitorCenter',
      isHide:true,
      icon:'iconfont icon-jiankong',
      // permission: [permission]
    },
    children: [
        {
          path: 'index',
          name: 'monitorCenterIndex',
          component: () => import('@/views/monitorCenter'),
        }
    ]
};
const  warnCenterRoutes = {
  path: '/warn',
  component: () => import('@/layout/index.vue'),
  redirect: '/warn/index',
  meta: {
    title: '告警中心',
    name: 'warnCenter',
    icon:'iconfont icon-gaojing',
    isHide:true,
    // permission: [permission]
  },
  children: [
      {
        path: 'index',
        name: 'warnCenterIndex',
        icon:'iconfont icon-gaojing',
        component: () => import('@/views/warnCenter'),
   
      }
  ]
};

const  FotaRoutes = {
  path: '/fota',
  component: () => import('@/layout/index.vue'),
  redirect: '/fota/index',
  meta: {
    title: 'FOTA升级',
    name: 'fota',
    icon:'iconfont iconfont icon-shengji',
    isHide:true,
    // permission: [permission]
  },
  children: [
      {
        path: 'index',
        name: 'fotaIndex',
        icon:'iconfont iconfont icon-shengji',
        component: () => import('@/views/fotaUp'),
      }
  ]
};

export default {
    monitorCenterRoutes,
    warnCenterRoutes,
    deviceCenterRoutes,
    FotaRoutes,
    dailyRecordRoutes,
};
