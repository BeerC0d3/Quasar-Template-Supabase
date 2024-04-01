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
      {{ $modalStore.getId > 0 ? objectCatalog.catname : 'Agregar cátalogo' }}
    </template>
    <template #seccion-form>
      <q-form class="row q-col-gutter-sm" ref="formCatalog">
        <q-input
          dense
          outlined
          v-model="objectCatalog.catkey"
          label="Clave cátalogo"
          lazy-rules
          class="col-lg-12 col-md-6 col-xs-12"
          :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']"
        />
        <q-input
          dense
          outlined
          v-model="objectCatalog.catname"
          label="Nombre cátalogo"
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
// const propertyAdd = ref<IPropertyObject[]>([{
//   key:'createdate',
//   value=
// }])
const objectCatalog = ref({
  catkey: '',
  catname: '',
  isdeleted: false,
});

const { Show, Hide, GetModal } = useModelMessage();
const $modalStore = useModalStore();
const $commonStore = useCommonStore();
const { insertData, updateData, getById } = useApi();
const bus = inject<any>('bus');

const isChangeId = computed(() => $modalStore.getId);
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
  if ($modalStore.getId > 0) {
    $commonStore.Add_Request();
    objectCatalog.value = await getById('system', 'catalog', $modalStore.getId);
    //  console.log(objectCatalog.value);
    // seccionModel.value = seccionResult.value;
  } else reset();
};

const onValidation = async (evt: any) => {
  formCatalog.value.validate().then(async (success: any) => {
    if (success) {
      try {
        $commonStore.Add_Request();
        let objectProcessed = null;

        if ($modalStore.getId > 0) {
          objectProcessed = useRemoveProperty.removeAddProperty(
            ['createdate'],
            [],
            objectCatalog.value
          );

          await updateData('system', 'catalog', objectProcessed);
        } else {
          objectProcessed = useRemoveProperty.removeAddProperty(
            ['id'],
            [
              {
                key: 'createdate',
                value: date.formatDate(timeStamp, 'YYYY-MM-DD'),
              },
            ],
            objectCatalog.value
          );
          await insertData('system', 'catalog', objectProcessed);
        }

        formCatalog.value.reset();
        formCatalog.value.resetValidation();
        bus.emit('load-catalog');
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
  if ($modalStore.getId == 0 || $modalStore.stateCancel || undefined) {
    //objectCatalog.value.id?=0;
    objectCatalog.value.catkey = '';
    objectCatalog.value.catname = '';
    //formCatalog.value.reset();

    // seccionModel.value.id = 0;
    // seccionModel.value.nombre = '';
  }
};
</script>
