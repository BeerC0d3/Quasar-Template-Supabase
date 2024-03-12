<template>
  <q-page>
    <div class="auth-header">
      <div class="auth-content">
        <p class="text-h4 text-weight-bold">Bienvenido</p>
      </div>
    </div>

    <!-- <div class="text-center">
        <q-img
          src="https://avatars.githubusercontent.com/u/117471209?v=4"
          spinner-color="white"
          class="rounded-borders"
          style="max-width: 300px"
        ></q-img>
      </div> -->
    <div class="container-template">
      <div class="row justify-center items-center content-center">
        <q-card class="q-ma-none auth-form shadow-1">
          <q-card-section>
            <p class="text-weight-bolder text-center text-grey-13">
              Accesar al sistema
            </p>
            <q-form class="q-gutter-y-md">
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
                    label="Register"
                    color="text-grey-13"
                    class="full-width"
                    flat
                    to="/register"
                    size="sm"
                  />
                  <q-btn
                    no-caps
                    label="Forgot Password ?"
                    color="text-grey-13"
                    class="full-width"
                    flat
                    :to="{ name: 'forgot-password' }"
                    size="sm"
                  />
                </div>
              </div>
            </q-form>
            <div class="card-icon-message text-center shadow-3">
              <q-btn
                round
                dense
                icon="fa-solid fa-arrow-right"
                class="bg-btn"
                color="white"
                size="2em"
                @click="handleLogin"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { IUserAuth } from '../Models/IUserAuth';
import useUserAuth from 'src/auth/composables/userAuth';

const { userSignIn } = useUserAuth();

const formLogin = ref<IUserAuth>({
  name: '',
  email: '',
  password: '',
});

const handleLogin = async () => {
  try {
    await userSignIn(formLogin.value);
    console.log('login con exito');
  } catch (error) {
    console.log(error);
  }
};
</script>
<style>
.auth-header {
  position: relative;
  background-color: #2c5291;
  height: 40vh;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 1001;
}
.auth-form {
  background-color: rgba(255, 255, 255);
  border: 1px solid rgba(255, 255, 255);
  border-radius: 15px 15px 15px 15px;
  margin-top: -120px;
  padding-top: 35px;
  padding-bottom: 40px;
  position: relative;
  width: 100%;
  z-index: 1002;
}
.auth-header .img {
  position: absolute;
  right: 20px;
  bottom: -20px;
  z-index: 1;
  width: calc(115px + 10 * (100vw - 320px) / 447);
}
.container-template {
  max-width: 650px;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
}
.auth-header .auth-content {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: end;
  -ms-flex-align: end;
  color: #ffc502;
  padding: 0 20px 40px;
}
.card-icon-message {
  position: absolute;
  z-index: 1005;
  margin-bottom: -70px;
  /* left: 25%;
  right: 25%; */
  background-color: #fff;
  padding: 10px;
  margin-left: 40%;
  min-height: 1.4em;
  min-width: 1.4em;
  border-radius: 50%;
}
.border-modal-message {
  border-radius: 20px !important;
}
.bg-btn {
  background: rgb(131, 58, 180) !important;
  background: linear-gradient(
    90deg,
    rgba(131, 58, 180, 1) 0%,
    rgba(253, 29, 29, 1) 4%,
    rgba(252, 176, 69, 1) 100%
  ) !important;
}
</style>
