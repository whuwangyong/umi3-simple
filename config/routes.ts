export default [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', name: 'Dashboard', icon: 'dashboard', component: './Dashboard' },
  {
    path: '/kafka',
    name: 'Kafka',
    icon: 'crown',
    routes: [
      { path: '/kafka/topic', name: '主题', icon: 'smile', component: './kafka/Topic' },
      {
        path: '/kafka/consumer-group',
        name: '消费者组',
        icon: 'smile',
        component: './kafka/ConsumerGroup',
      },
    ],
  },

  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './user/Login' },
      { component: './404' },
    ],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin/sub-page', name: '二级管理页', icon: 'smile', component: './Admin' },
      { component: './404' },
    ],
  },
  { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },

  { component: './404' },
];
