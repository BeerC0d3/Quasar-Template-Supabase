<template>
  <q-layout view="lHh Lpr lFf">
    <page-drawer />
    <q-page-container>
      <q-page>
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup></script>
