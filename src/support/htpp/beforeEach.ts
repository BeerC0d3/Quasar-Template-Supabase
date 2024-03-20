// import { useUserStore } from 'src/stores/all';
import useAuthUser from 'src/auth/composables/userAuth';

export const addBeforeEach = (Router: any) => {
  // const store = useUserStore();
  Router.beforeEach(async (to: any, from: any, next: any) => {
    const { isLoggedIn } = useAuthUser();
    const destination = to.name;
    //const requiresLogin = true;
    const isAuthenticated = isLoggedIn();

    const requiresLogin = to.meta.requireLogin;
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
