<template>
  <page-header>
    <template #title>{{ userInfoLogged.name }}</template>
  </page-header>
  <page-body>
    <div class="q-pa-lg">
      <q-btn
        no-caps
        label="logout"
        class="full-width text-weight-bolder text-grey-13"
        flat
        @click="handledLogout"
      />
      <p v-for="i in 20" :key="i">
        Lorems ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate
        aperiam suscipit blanditiis iusto earum, velit adipisci sequi ex ipsum,
        aut non. Doloremque iusto eius at quibusdam blanditiis ex vero eaque?
      </p>
    </div>
  </page-body>
</template>
<script setup lang="ts">
import useAuthUser from 'src/auth/composables/userAuth';
import useModelMessage from 'src/Composables/ModalMessage';
import { useRouter } from 'vue-router';

const { userInfoLogged, logout } = useAuthUser();
const { Show } = useModelMessage();
const $router = useRouter();

const handledLogout = async () => {
  try {
    await logout();
    $router.push('/auth/login');
  } catch (error: any) {
    Show('ERROR', 'Error', error);
  }
};
</script>
