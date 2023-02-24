
const deviceCenterRoutes = {
    path: '/record',
    component: () => import('@/layout/index.vue'),
    redirect: '/record/upload',
    meta: {
      title: '日志中心',
      name: 'dailyRecord',
      icon: 'iconfont icon-rizhiguanli',
      // permission: [permission]
    },
    children: [
      {
        path: 'upload',
        name: 'recordUpload',
        component: () => import('@/views/logCenter/logUpload'),
        meta: {
          title: '日志上传',
          icon:'iconfont icon-shangchuan',
          // permission: [permission]
        }
      },
      {
          path: 'manage',
          name: 'recordManage',
          component: () => import('@/views/logCenter/logManage'),
          meta: {
            title: '日志管理',
            icon:'iconfont icon-rizhiguanli',
            // permission: [permission]
          }
        },
        {
          path: 'deploy',
          name: 'recordDeploy',
          component: () => import('@/views/logCenter/logSet'),
          meta: {
            title: '海思日志配置',
            icon:'iconfont icon-29rizhipeizhi',
            // permission: [permission]
          }
        },
    
    ]
  };
  
  export default deviceCenterRoutes;
  