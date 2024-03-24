<template>
  <div class="app-drawer">
    <q-drawer
      class="bg-secondary"
      v-model="leftDrawerOpen"
      side="left"
      overlay
      bordered
      behavior="mobile"
      @hide="(value) => ShowHidden(value)"
    >
      <q-scroll-area class="scroll-content">
        <q-list>
          <MenuRecursive v-for="item in menus" :key="item.id" v-bind="item" />
        </q-list>
        <!-- <p v-for="i in 20" :key="i">
          Lorems ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate
          aperiam suscipit blanditiis iusto earum, velit adipisci sequi ex
          ipsum, aut non. Doloremque iusto eius at quibusdam blanditiis ex vero
          eaque?
        </p> -->
      </q-scroll-area>
      <div class="absolute-top text-center avatar-top">
        <div class="bg-transparent">
          <div class="q-mb-sm avatar-med-circule">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </div>
          <div class="text-weight-bold text-blue-grey-1">
            {{ userInfoLogged.name }}
          </div>
        </div>
      </div>
    </q-drawer>
  </div>
</template>
<script setup lang="ts">
import { ref, onBeforeMount, onMounted, inject, computed, watch } from 'vue';
import { useDrawerStore } from 'src/stores/all';
import MenuRecursive from '../app/components/System/MenuRecursive.vue';
// import useHookMenu from '../app/hooks/Sistema/HMenu';
import { useCommonStore } from 'stores/all';
import useAuthUser from 'src/auth/composables/userAuth';
import useMenu from 'src/app/Composables/System/BuildMenu';

const { userInfoLogged } = useAuthUser();
const { getMenu, menus } = useMenu();
const $drawerStore = useDrawerStore();
const leftDrawerOpen = ref(false);
// const bus = inject<any>('bus');

const ShowHidden = (evt: any) => {
  $drawerStore.setToggle();
};
const isOpenDrawer = computed(() => $drawerStore.getLeftDrawer);
watch(
  () => isOpenDrawer.value,
  (newVal) => {
    if (newVal) leftDrawerOpen.value = isOpenDrawer.value;
    else leftDrawerOpen.value = false;
  }
);

// const { getAll, menus } = useHookMenu();
const $commonStore = useCommonStore();
onBeforeMount(async () => {
  await getMenu();
});

// onMounted(() => {
//   console.log(menus.value);
// });
// onBeforeMount(async () => {
//   try {

//     $commonStore.Add_Request();
//     await getAll();
//   } catch (e) {
//     $commonStore.Remove_Request();
//     console.log(e);
//   }
// });
</script>
<style lang="scss" scoped>
.app-drawer {
  @import 'src/css/drawer.scss';
}
</style>
