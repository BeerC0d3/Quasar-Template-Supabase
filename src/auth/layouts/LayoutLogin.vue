<template>
  <div id="layout-login">
    <div></div>
    <q-layout view="lHh Lpr lFf" :class="{ 'ios-browser-swiping-back': true }">
      <!-- <q-header elevated> </q-header> -->
      <div class="auth-header"></div>
      <q-page-container>
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
        <!-- <router-view v-slot="{ Component }">
          <transition appear enter-active-class="animated backInLeft">
            <component :is="Component" />
          </transition>
        </router-view> -->
      </q-page-container>
    </q-layout>
  </div>
</template>
<style lang="scss">
#layout-login {
  @import 'src/css/login.scss';
}
</style>
