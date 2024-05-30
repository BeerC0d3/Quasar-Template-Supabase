<template>
  <page-header>
    <template #buttons-left>
      <page-header-btn-back label="Atras" />
    </template>
    <template #title></template>
  </page-header>
  <page-body>
    <div class="q-pa-md">
      <div class="row q-mb-md">
        <span class="text-h6 text-primary"> {{ catalog?.catname }} </span>
        <q-space />
        <q-btn round icon="add" color="secondary" @click="clickModalForm" />
      </div>
      <empty-data
        icon="fa-solid fa-pager"
        :label="`No hay ningún registro para ${catalog?.catname}`"
        v-if="listCatalogDetail.length == 0"
      />
      <useSlideItem
        v-for="catalog in listCatalogDetail"
        :key="catalog.id"
        :slide-item="{
          rowId: catalog.id,
          title: catalog.catdetname,
          subTitle: catalog.catdetkey,
          titleSideTop: '',
          titleSideBottom: '',
          iconSide: false,
          avatar: false,
        }"
        :edit="fnEdit"
        :to="fnRouteTo"
      />
    </div>
  </page-body>
  <useCatalogDetailFormModal />
  <modal-message :modal="GetModal().value" @close="Hide()" />
</template>
<script setup lang="ts">
import { ref, onBeforeMount, inject, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import useSlideItem from 'src/app/components/System/SlideItem.vue';
import useDetApi from 'src/app/Composables/System/CatalogDetail';
import useApi from 'src/app/Composables/UseApi';
import { ICatalogDetail, ICatalog } from 'src/app/Models/System/IModel';
import useCatalogDetailFormModal from 'src/app/components/System/CatalogDetailAddEdit.vue';
import useModelMessage from 'src/Composables/ModalMessage';
import { useModalStore, useCommonStore } from 'src/stores/all';

const catId = ref(0);
const listCatalogDetail = ref<ICatalogDetail[]>([]);
const catalog = ref<ICatalog>();
const { getByCatalogId } = useDetApi();
const { getById } = useApi();
const $commonStore = useCommonStore();
const route = useRoute();
const bus = inject<any>('bus');
const $modalStore = useModalStore();
const { Show, Hide, GetModal } = useModelMessage();

const isUpdate = computed(() => route.params.catid);
onBeforeMount(async () => {
  catId.value = parseInt(isUpdate.value.toString());
  catalog.value = await getById('system', 'catalog', catId.value);
  if (isUpdate.value) {
    await getCatalogDetail();
  }
});

const clickModalForm = () => {
  $modalStore.ShowModal(1, [
    { key: 'id', value: '0' },
    { key: 'catid', value: catId.value.toString() },
  ]);
};

const getCatalogDetail = async () => {
  try {
    $commonStore.Add_Request();

    listCatalogDetail.value = await getByCatalogId(catId.value);
    console.log(listCatalogDetail.value);
  } catch (error: any) {
    $commonStore.Remove_Request();
    Show('ERROR', 'Error', error);
  }
};
const fnEdit = (rowId: number) => {
  $modalStore.ShowModal(1, [
    { key: 'id', value: rowId.toString() },
    { key: 'catid', value: catId.value.toString() },
  ]);
};
const fnRouteTo = (rowId: number) => {
  //router.push({ name: 'catalog-detail', params: { catid: rowId } });
};

bus.on('load-catalog-detail', async () => {
  await getCatalogDetail();
});
</script>
