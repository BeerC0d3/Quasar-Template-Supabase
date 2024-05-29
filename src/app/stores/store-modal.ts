import { defineStore } from 'pinia';
import { IParamsQuery } from '../Models/System/IModel';

interface modalState {
  show: boolean;
  id: number;
  isCancel: boolean;
  mode: number; //0:Hide,1,Show
  paramsQuery: IParamsQuery[];
}

export const useModalStore = defineStore('modalForm', {
  state: (): modalState => ({
    show: false,
    id: 0,
    isCancel: false,
    mode: 0,
    paramsQuery: [],
  }),
  getters: {
    stateShow: (state) => state.show,
    getId: (state) => state.id,
    stateCancel: (state) => state.isCancel,
    stateMode: (state) => state.mode,
    stateParams: (state) => state.paramsQuery,
  },
  actions: {
    ShowModal(Id: number, params: IParamsQuery[]) {
      //this.id = Id;
      this.mode = 1;
      this.show = true;
      this.paramsQuery = params;

      //console.log(this.paramsQuery);
    },
    HideModal() {
      this.show = false;
      this.id = 0;
      this.mode = 0;
    },
    Cancel(iscancel: boolean) {
      this.isCancel = iscancel;
    },
  },
});
