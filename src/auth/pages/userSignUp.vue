<template>
  <page>
    <div class="container-template">
      <div class="row justify-center items-center content-center">
        <q-card class="q-ma-none auth-form shadow-1">
          <q-card-section>
            <p class="text-weight-bolder text-center text-grey-13">
              Registrar al sistema
            </p>
            <q-form class="q-gutter-y-md" @submit.prevent="handleSignUp">
              <div class="col-md-4 col-sm-6 col-xs-10">
                <q-input
                  rounded
                  outlined
                  label="Nombre"
                  v-model="formSignUp.name"
                  lazy-rules
                  stack-label
                  :rules="[
                    (val) => (val && val.length > 0) || 'Nombre es requerido',
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="person" color="primary" />
                  </template>
                </q-input>

                <q-input
                  rounded
                  outlined
                  label="Email"
                  v-model="formSignUp.email"
                  lazy-rules
                  stack-label
                  :rules="[
                    (val) => (val && val.length > 0) || 'Email es requerido',
                  ]"
                  type="email"
                >
                  <template v-slot:prepend>
                    <q-icon name="email" color="primary" />
                  </template>
                </q-input>

                <q-input
                  rounded
                  outlined
                  label="Password"
                  v-model="formSignUp.password"
                  lazy-rules
                  stack-label
                  :rules="[
                    (val) => (val && val.length > 0) || 'Password es requerido',
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="lock" color="primary" />
                  </template>
                </q-input>

                <div class="full-width q-gutter-y-sm">
                  <q-btn
                    unelevated
                    rounded
                    no-caps
                    color="primary"
                    label="Guardar"
                    class="full-width"
                    size="md"
                    type="submit"
                  />
                  <q-btn
                    unelevated
                    rounded
                    color="secondary"
                    no-caps
                    label="Cancelar"
                    to="/auth/login"
                    class="full-width"
                    size="md"
                  />
                </div>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </page>
  <modal-message :modal="GetModal().value" @close="Hide()" />
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { IUserAuth } from '../Models/IUserAuth';
import useUserAuth from 'src/auth/composables/userAuth';
import useModelMessage from 'src/Composables/ModalMessage';
import { useCommonStore } from 'src/stores/all';

const { userSignUp } = useUserAuth();
const { Show, Hide, GetModal } = useModelMessage();
const $commonStore = useCommonStore();
const formSignUp = ref<IUserAuth>({
  name: '',
  email: '',
  password: '',
});
// onMounted(() => {
//   Show('SUCCESS', 'Exito!', 'Se guardo correctamente');
// });

const handleSignUp = async () => {
  try {
    $commonStore.Add_Request();
    await userSignUp(formSignUp.value);
    Show('SUCCESS', 'Exito!', 'Se guardo correctamente');

    // router.push({
    //   name: 'email-confirmation',
    //   query: { email: form.value.email }
    // })
  } catch (error: any) {
    $commonStore.Remove_Request();
    Show('ERROR', 'Error', error);
  }
};
</script>
