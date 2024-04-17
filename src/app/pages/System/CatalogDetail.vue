<template>
  <page-header>
    <template #buttons-left>
      <page-header-btn-back label="" />
    </template>
    <template #title></template>
  </page-header>
  <page-body>
    <div class="q-pa-md">
      <div class="row q-mb-md">
        <span class="text-h6 text-primary"> {{ catalog?.catname }} </span>
        <q-space />
        <q-btn round icon="add" color="secondary" />
      </div>
      <empty-data
        icon="fa-solid fa-pager"
        :label="`No hay ningún registro para ${catalog?.catname}`"
        v-if="listCatalogDetail.length == 0"
      />
    </div>
  </page-body>
  <modal-message :modal="GetModal().value" @close="Hide()" />
</template>
<script setup lang="ts">
import { ref, onBeforeMount, inject, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import useSlideItem from 'src/app/components/System/SlideItem.vue';
import useDetApi from 'src/app/Composables/System/CatalogDEtail';
import useApi from 'src/app/Composables/UseApi';
import { ICatalogDetail, ICatalog } from 'src/app/Models/System/IModel';
// import useCatalogFormModal from 'src/app/components/System/CatalogAddEdit.vue';
import useModelMessage from 'src/Composables/ModalMessage';
import { useModalStore, useCommonStore } from 'src/stores/all';

const catId = ref(0);
const listCatalogDetail = ref<ICatalogDetail[]>([]);
const catalog = ref<ICatalog>();
const { getByCatalogId } = useDetApi();
const { getById } = useApi();
const $commonStore = useCommonStore();
const route = useRoute();
const $modalStore = useModalStore();
const { Show, Hide, GetModal } = useModelMessage();

const isUpdate = computed(() => route.params.id);
onBeforeMount(async () => {
  // catId.value = parseInt(isUpdate.value.toString());
  // catalog.value = await getById('system', 'catalog', catId.value);
  // if (isUpdate.value) {
  //   await getCatalogDetail();
  // }
});

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
</script>
