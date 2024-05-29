<template>
  <modal-form>
    <template #seccion-button-save>
      <q-btn
        unelevated
        rounded
        no-caps
        color="primary"
        label="Guardar"
        @click="onValidation"
        @reset="reset"
      />
    </template>
    <template #seccion-title>
      {{
        $modalStore.getId > 0
          ? objectCatalogDetail.catdetname
          : 'Agregar elemento'
      }}
    </template>
    <template #seccion-form>
      <q-form class="row q-col-gutter-sm" ref="formCatalog">
        <q-input
          dense
          outlined
          v-model="objectCatalogDetail.catdetkey"
          label="Clave"
          lazy-rules
          class="col-lg-12 col-md-6 col-xs-12"
        />
        <q-input
          dense
          outlined
          v-model="objectCatalogDetail.catdetname"
          label="Nombre elemento"
          lazy-rules
          class="col-lg-12 col-md-6 col-xs-12"
          :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']"
        />
      </q-form>
      <modal-message :modal="GetModal().value" @close="Hide()" />
    </template>
  </modal-form>
</template>
<script setup lang="ts">
import { ref, inject, computed, watch } from 'vue';
import useApi from 'src/app/Composables/UseApi';
import { useModalStore, useCommonStore } from 'src/stores/all';
import { useRemoveProperty } from 'src/support/utils/RemoveAddPropertyObject';
import useModelMessage from 'src/Composables/ModalMessage';
import { IPropertyObject } from 'src/app/Models/System/IModel';
import { date } from 'quasar';

let today = new Date();

const timeStamp = Date.now();
const formCatalog = ref<any>(null);
const id = ref(0);
const catid = ref(0);

const objectCatalogDetail = ref({
  catid: 0,
  catdetkey: '',
  catdetname: '',
  isdeleted: false,
});

const { Show, Hide, GetModal } = useModelMessage();
const $modalStore = useModalStore();
const $commonStore = useCommonStore();
const { insertData, updateData, getById } = useApi();
const bus = inject<any>('bus');

const isChangeId = computed(() => $modalStore.stateMode);
const isCancelCompute = computed(() => $modalStore.stateCancel);

watch(
  () => isChangeId.value,
  (newVal) => {
    if (newVal) loadData();
    else reset();
  }
);
watch(
  () => isCancelCompute.value,
  (newVal) => {
    if (newVal) reset();
  }
);

const loadData = async () => {
  $modalStore.stateParams.forEach((item: IPropertyObject) => {
    if (item.key == 'id') id.value = parseInt(item.value);
    if (item.key == 'catid') catid.value = parseInt(item.value);
  });

  if (id.value > 0) {
    $commonStore.Add_Request();
    objectCatalogDetail.value = await getById(
      'system',
      'catalogdetail',
      id.value
    );
  } else reset();
};

const onValidation = async (evt: any) => {
  formCatalog.value.validate().then(async (success: any) => {
    if (success) {
      try {
        $commonStore.Add_Request();
        let objectProcessed = null;
        objectCatalogDetail.value.catid = catid.value;

        if (id.value > 0) {
          objectProcessed = useRemoveProperty.removeAddProperty(
            ['createdate'],
            [],
            objectCatalogDetail.value
          );

          await updateData('system', 'catalogdetail', objectProcessed);
        } else {
          objectProcessed = useRemoveProperty.removeAddProperty(
            ['id'],
            [
              {
                key: 'createdate',
                value: date.formatDate(timeStamp, 'YYYY-MM-DD'),
              },
            ],
            objectCatalogDetail.value
          );
          await insertData('system', 'catalogdetail', objectProcessed);
        }

        formCatalog.value.reset();
        formCatalog.value.resetValidation();
        bus.emit('load-catalog-detail');
        reset();
        Show('SUCCESS', 'Exito!', 'El catalogo se guardó correctamente');
        $modalStore.HideModal();

        // });
      } catch (error: any) {
        $commonStore.Remove_Request();
        Show('ERROR', 'Error', error);
      }
    }
  });
};

const reset = () => {
  if ($modalStore.stateCancel || undefined) {
    objectCatalogDetail.value.catdetkey = '';
    objectCatalogDetail.value.catdetname = '';
  }
};
</script>
