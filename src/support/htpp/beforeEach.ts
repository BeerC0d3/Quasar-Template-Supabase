// import { useUserStore } from 'src/stores/all';

export const addBeforeEach = (Router: any) => {
  // const store = useUserStore();
  Router.beforeEach(async (to: any, from: any, next: any) => {
    const destination = to.name;
    const requiresLogin = true;
    const isAuthenticated = false;

    // const requiresLogin = to.meta.requireLogin;
    // const isAuthenticated = store.isAuthenticated;

    if (destination === 'Page Login') {
      if (isAuthenticated) next({ name: 'Admin Dashboard' });
      else next();
    } else {
      if (requiresLogin) {
        console.log('entre aqui requires Login');
        if (isAuthenticated) next();
        else next({ path: '/auth/login', query: { to: to.path } });
      } else next();
    }
  });
};
