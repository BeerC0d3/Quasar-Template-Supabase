<template>
  <modal-form>
    <template #seccion-button-save>
      <q-btn
        flat
        dense
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
import useModelMessage from 'src/Composables/ModalMessage';

let today = new Date();
const formCatalog = ref<any>(null);
const objectCatalog = ref({
  catkey: '',
  catname: '',
  isdeleted: false,
  createdate: today,
});

const { Show, Hide, GetModal } = useModelMessage();
const $modalStore = useModalStore();
const $commonStore = useCommonStore();
const { insertData, updateData, getById } = useApi();
const bus = inject<any>('bus');

const isChangeId = computed(() => $modalStore.getId);
watch(
  () => isChangeId.value,
  (newVal) => {
    if (newVal) loadData();
    else reset();
  }
);

const loadData = async () => {
  if ($modalStore.getId > 0) {
    $commonStore.Add_Request();
    objectCatalog.value = await getById('system', 'catalog', $modalStore.getId);
    console.log(objectCatalog.value);
    // seccionModel.value = seccionResult.value;
  } else reset();
};

const onValidation = async (evt: any) => {
  formCatalog.value.validate().then(async (success: any) => {
    if (success) {
      try {
        $commonStore.Add_Request();
        if ($modalStore.getId > 0)
          await updateData('system', 'catalog', objectCatalog.value);
        else await insertData('system', 'catalog', objectCatalog.value);

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
  if ($modalStore.getId == 0 || undefined) {
    //objectCatalog.value.id?=0;
    objectCatalog.value.catkey = '';
    objectCatalog.value.catname = '';
    formCatalog.value.reset();
    // seccionModel.value.id = 0;
    // seccionModel.value.nombre = '';
  }
};
</script>
