import { boot } from 'quasar/wrappers';

import ModalMessage from '../components/ModalMessage.vue';
import Page from '../components/Page.vue';
export default boot(async ({ app }) => {
  app.component('modal-message', ModalMessage);
  app.component('page', Page);
});
