
const deviceCenterRoutes = {
  path: '/device',
  component: () => import('@/layout/index.vue'),
  redirect: '/device/deviceManage',
  meta: {
    title: '设备中心',
    name: 'device',
    icon:'iconfont icon-shebeiguanli',
    // permission: [permission]
  },
  children: [
    {
      path: 'deviceManage',
      name: 'deviceManage',
      component: () => import('@/views/deviceCenter/deviceManage'),
      meta: {
        title: '设备管理',
        icon:'iconfont icon-shebeiguanli',
        // permission: [permission]
        
      }
    },
    {
        path: 'classifyManage',
        name: 'classifyManage',
        component: () => import('@/views/deviceCenter/classifyManage'),
        meta: {
          title: '分类管理',
          icon:'iconfont icon-fenlei',
          // permission: [permission]
        }
      },
      {
        path: 'PLCstatusManage',
        name: 'PLCstatusManage',
        component: () => import('@/views/deviceCenter/PLCstatusManage'),
        meta: {
          title: 'PLC状态监控',
          icon:'iconfont icon-zhuangtaijiankong',
          // permission: [permission]
        }
      },
      {
        path: 'node',
        name: 'node',
        component: () => import('@/views/deviceCenter/nodeManage'),
        meta: {
          title: '节点管理',
          icon:'iconfont icon-zhuangtaijiankong',
          // permission: [permission]
        }
      },
      {
        path: 'analyse/:nodeName?',
        name: 'analyse',
        component: () => import('@/views/deviceCenter/nodeManage/analyse'),
        meta: {
          title: '一键分析',
          hideInMenu:true,
          icon:'iconfont icon-zhuangtaijiankong',
          // permission: [permission]
        }
      },
  
  ]
};

export default deviceCenterRoutes;
