export default [
  {
    path: '/app',
    component: () => import('../layouts/AppLayout.vue'),
    meta: { requireLogin: true },
    children: [
      { path: '', redirect: '/app/Home' },
      {
        path: 'Home',
        component: () => import('../pages/Home.vue'),
        //meta: { requireLogin: true },
      },
      {
        path: 'System',
        redirect: '/app/System/Catalog',
        children: [
          {
            path: 'Catalog',
            component: () => import('../pages/System/Catalog.vue'),
          },
          {
            name: 'catalog-detail',
            path: 'CatalogDetail/:catid?',
            component: () => import('../pages/System/CatalogDetail.vue'),
          },
          // {
          //   path: 'add-edit',
          //   component: () => import('../pages/Periodos/AddEdit.vue'),
          //   //meta: { requireLogin: true },
          // },
        ],
      },
      // {
      //   path: 'Usuarios',
      //   children: [
      //     // { path: '', redirect: '/List' },
      //     {
      //       // name: 'List',
      //       path: '',
      //       component: () => import('../pages/Seguridad/ListUsuario.vue'),
      //       //meta: { requireLogin: true },
      //     },
      //     {
      //       path: 'add-edit',
      //       component: () => import('../pages/Seguridad/AddEdit.vue'),
      //       //meta: { requireLogin: true },
      //     },
      //   ],
      // },
      // {
      //   path: 'Secciones',
      //   children: [
      //     {
      //       path: '',
      //       component: () => import('../pages/Secciones/ListSeccion.vue'),
      //       //meta: { requireLogin: true },
      //     },
      //   ],
      // },
      // {
      //   path: 'MiGente',
      //   children: [
      //     {
      //       path: '',
      //       component: () => import('../pages/MiGente/ListPersona.vue'),
      //       //meta: { requireLogin: true },
      //     },
      //     // {
      //     //   path: 'persona-map',
      //     //   component: () => import('../pages/MiGente/PersonaMap.vue'),
      //     //   //meta: { requireLogin: true },
      //     // },
      //   ],
      // },
      // {
      //   path: 'Ingresos',
      //   //  { path: '', redirect: '/app/Home' },
      //   children: [
      //     {
      //       name: 'Cooperacion',
      //       path: 'Cooperacion',
      //       component: () => import('../pages/Ingresos/Cooperacion.vue'),
      //     },
      //     {
      //       name: 'MiCooperacion',
      //       path: 'MiCooperacion',
      //       component: () => import('../pages/Ingresos/MiCooperacion.vue'),
      //     },
      //   ],
      // },
      // {
      //   path: 'Ventas',
      //   children: [
      //     {
      //       path: 'BoletoAutobus',
      //       children: [
      //         {
      //           name: 'VentaBoletosBus',
      //           path: '',
      //           component: () =>
      //             import('../pages/Ventas/BoletoAutobus/ListBoleto.vue'),
      //         },
      //         {
      //           name: 'AddEdit',
      //           path: 'AddEdit',
      //           component: () =>
      //             import('../pages/Ventas/BoletoAutobus/AddEdit.vue'),
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   path: 'Test',
      //   children: [
      //     {
      //       path: '',
      //       component: () => import('../pages/Test.vue'),
      //     },
      //   ],
      // },
    ],
  },
];
