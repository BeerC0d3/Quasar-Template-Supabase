<template>
  <page-header>
    <template #title>Cátalogo</template>
  </page-header>
  <page-body>
    <div class="q-pa-md">
      <div class="row q-mb-md">
        <span class="text-h6 text-primary"> Cátalogo </span>
        <q-space />
        <q-btn round icon="add" color="secondary" @click="clickModalForm" />
      </div>
      <empty-data
        icon="fa-solid fa-pager"
        label="No hay ningún cátalogo."
        v-if="listCatalog.length == 0"
      />
      <useSlideItem
        v-for="catalog in listCatalog"
        :key="catalog.id"
        :slide-item="{
          rowId: catalog.id,
          title: catalog.catname,
          subTitle: catalog.catkey,
          titleSideTop: '',
          titleSideBottom: '',
          iconSide: '',
        }"
        :edit="fnEdit"
      />
    </div>
  </page-body>
  <useCatalogFormModal />
  <modal-message :modal="GetModal().value" @close="Hide()" />
</template>
<script setup lang="ts">
import { ref, onBeforeMount, inject } from 'vue';
import useSlideItem from 'src/app/components/System/SlideItem.vue';
import useApi from 'src/app/Composables/UseApi';
import { ICatalog } from 'src/app/Models/System/IModel';
import useCatalogFormModal from 'src/app/components/System/CatalogAddEdit.vue';
import useModelMessage from 'src/Composables/ModalMessage';
import { useModalStore, useCommonStore } from 'src/stores/all';

const { Show, Hide, GetModal } = useModelMessage();
const { TableToList } = useApi();
const $commonStore = useCommonStore();
const $modalStore = useModalStore();
const bus = inject<any>('bus');

const listCatalog = ref<ICatalog[]>([]);

const clickModalForm = () => {
  $modalStore.ShowModal(0);
  // $modalStore.Cancel(false);
};

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
  //await InsertTest();
  await getCatalog();
});
const fnEdit = (rowId: number) => {
  //console.log(rowId);
  $modalStore.ShowModal(rowId);
};

bus.on('load-catalog', async () => {
  await getCatalog();
});
</script>
<style lang="scss"></style>
