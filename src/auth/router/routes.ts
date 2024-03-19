export default [
  {
    path: '/',
    beforeEnter: (to: any, from: any, next: any) => {
      to.fullPath === '/' ? next('/auth') : next();
    },
    component: () => import('../layouts/LayoutLogin.vue'),
    meta: { requireLogin: false },
    children: [
      {
        path: '/auth',
        component: () => import('../pages/AuthPage.vue'),
        children: [
          { path: 'login', component: () => import('../pages/Login.vue') },
          {
            path: 'register',
            component: () => import('../pages/userSignUp.vue'),
          },
        ],
      },
    ],
  },
];
