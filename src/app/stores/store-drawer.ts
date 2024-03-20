import { defineStore } from 'pinia';

interface drawerState {
  leftDrawer: boolean;
}

export const drawerStore = defineStore('drawer', {
  state: (): drawerState => ({
    leftDrawer: false,
  }),
  getters: {
    getLeftDrawer: (state) => state.leftDrawer,
  },
  actions: {
    StateToggle(isOpen: boolean) {
      this.leftDrawer = isOpen;
    },
    setToggle() {
      this.leftDrawer = false;
    },
  },
});
