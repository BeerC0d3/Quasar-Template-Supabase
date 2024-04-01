import { defineStore } from 'pinia';

interface modalState {
  show: boolean;
  id: number;
  isCancel: boolean;
}

export const useModalStore = defineStore('modalForm', {
  state: (): modalState => ({
    show: false,
    id: 0,
    isCancel: false,
  }),
  getters: {
    stateShow: (state) => state.show,
    getId: (state) => state.id,
    stateCancel: (state) => state.isCancel,
  },
  actions: {
    ShowModal(Id: number) {
      this.id = Id;
      this.show = true;
    },
    HideModal() {
      this.show = false;
      this.id = 0;
    },
    Cancel(iscancel: boolean) {
      this.isCancel = iscancel;
    },
  },
});
