<template>
  <page>
    <div class="container-template">
      <div class="row justify-center items-center content-center">
        <q-card class="q-ma-none auth-form shadow-1">
          <div class="auth-image">
            <img class="img-fluid img" src="~assets/money.svg" alt="v1" />
          </div>

          <q-card-section>
            <p class="text-weight-bolder text-center text-grey-13">
              Accesar al sistema
            </p>
            <q-form class="q-gutter-y-md" @submit.prevent="handleLogin">
              <div class="col-md-4 col-sm-6 col-xs-10">
                <q-input
                  rounded
                  outlined
                  label="Email"
                  v-model="formLogin.email"
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
                  v-model="formLogin.password"
                  lazy-rules
                  stack-label
                  :rules="[
                    (val) => (val && val.length > 0) || 'Password es requerido',
                  ]"
                  type="password"
                >
                  <template v-slot:prepend>
                    <q-icon name="lock" color="primary" />
                  </template>
                </q-input>

                <div class="full-width q-pt-md">
                  <!-- <q-btn
                    label="Login"
                    color="primary"
                    class="full-width"
                    outline
                    rounded
                    type="submit"
                  /> -->
                </div>
                <div class="full-width q-gutter-y-sm">
                  <q-btn
                    no-caps
                    label="Registrar"
                    class="full-width text-grey-13 text-weight-bolder"
                    flat
                    to="/auth/register"
                  />
                  <q-btn
                    no-caps
                    label="Olvidé mi contraseña"
                    class="full-width text-weight-bolder text-grey-13"
                    flat
                    @click="loadingTest"
                  />
                </div>
              </div>
              <div class="card-icon-message text-center shadow-3">
                <q-btn
                  round
                  dense
                  icon="fa-solid fa-arrow-right"
                  class="bg-btn"
                  color="white"
                  size="2em"
                  type="submit"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </page>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCommonStore } from 'src/stores/all';
import { IUserAuth } from '../Models/IUserAuth';
import useUserAuth from 'src/auth/composables/userAuth';
import useModelMessage from 'src/Composables/ModalMessage';

const { userSignIn } = useUserAuth();
const { Show, Hide, GetModal } = useModelMessage();
const $commonStore = useCommonStore();
const $router = useRouter();

const formLogin = ref<IUserAuth>({
  name: '',
  email: '',
  password: '',
});

const loadingTest = () => {
  $commonStore.Add_Request();
};

const handleLogin = async () => {
  try {
    $commonStore.Add_Request();
    await userSignIn(formLogin.value);
    $router.push('/app');
  } catch (error: any) {
    $commonStore.Remove_Request();
    Show('ERROR', 'Error', error);
  }
};
</script>
