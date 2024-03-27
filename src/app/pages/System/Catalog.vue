<template>
  <page-header>
    <template #title>Cátalogo</template>
  </page-header>
  <page-body>
    <div class="q-pa-md">
      <div class="row q-mb-md">
        <span class="text-h6 text-primary"> Cátalogo </span>
        <q-space />
        <q-btn round icon="add" color="secondary" />
      </div>
      <useSlideItem
        v-for="catalog in listCatalog"
        :key="catalog.id"
        :slide-item="{
          title: catalog.catname,
          subTitle: catalog.catkey,
          titleSideTop: '',
          titleSideBottom: '',
          iconSide: '',
        }"
      />
    </div>
  </page-body>
  <modal-message :modal="GetModal().value" @close="Hide()" />
</template>
<script setup lang="ts">
import { ref, onBeforeMount, onMounted } from 'vue';
import useSlideItem from 'src/app/components/System/SlideItem.vue';
import useApi from 'src/app/Composables/UseApi';
import { ICatalog } from 'src/app/Models/System/IModel';
import useModelMessage from 'src/Composables/ModalMessage';
import { useCommonStore } from 'src/stores/all';

const { Show, Hide, GetModal } = useModelMessage();
const { TableToList, insertData, updateData } = useApi();
const $commonStore = useCommonStore();

const listCatalog = ref<ICatalog[]>([]);
let today = new Date();
const formCatalog = ref<object>({
  id: 4,
  catkey: 'TEST5',
  catname: 'Prueba 5Xiyu',
  isdeleted: false,
  createdate: today,
});

const getCatalog = async () => {
  try {
    $commonStore.Add_Request();
    listCatalog.value = await TableToList('system', 'catalog');
  } catch (error: any) {
    $commonStore.Remove_Request();
    Show('ERROR', 'Error', error);
  }
};

onBeforeMount(async () => {
  await InsertTest();
  await getCatalog();
});

const InsertTest = async () => {
  try {
    $commonStore.Add_Request();
    await updateData('system', 'catalog', formCatalog.value);
  } catch (error: any) {
    $commonStore.Remove_Request();
    Show('ERROR', 'Error', error);
  }
};
</script>
<style lang="scss"></style>
