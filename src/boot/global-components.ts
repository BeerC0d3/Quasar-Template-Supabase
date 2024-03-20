import { boot } from 'quasar/wrappers';

import ModalMessage from '../components/ModalMessage.vue';
import Header from '../components/Header.vue';
import Page from '../components/Page.vue';
import Body from '../components/Body.vue';
import Drawer from '../components/Drawer.vue';
export default boot(async ({ app }) => {
  app.component('modal-message', ModalMessage);
  app.component('page', Page);
  app.component('page-header', Header);
  app.component('page-body', Body);
  app.component('page-drawer', Drawer);
});
