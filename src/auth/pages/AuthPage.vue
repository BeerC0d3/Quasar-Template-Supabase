<template>
  <page>
    <router-view v-slot="{ Component }">
      <transition appear enter-active-class="animated slideInLeft">
        <component :is="Component" />
      </transition>
    </router-view>
  </page>
</template>
<script setup lang="ts"></script>
