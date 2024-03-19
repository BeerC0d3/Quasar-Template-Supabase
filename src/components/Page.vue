<template>
  <div class="page">
    <div class="page-nudger fit" :class="{ 'nudge-left': hasActiveChildPage }">
      <slot />
    </div>

    <!-- <router-view v-slot="{ Component }">
      <transition
        appear
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutRight"
        :css="true"
      >
        <component
          @pageActivated="hasActiveChildPage = true"
          @pageDeactivated="hasActiveChildPage = false"
          :is="Component"
        />
      </transition>
    </router-view> -->
  </div>
</template>
<script setup lang="ts">
import { ref, onActivated, onDeactivated } from 'vue';

const emit = defineEmits(['pageActivated', 'pageDeactivated']);
let hasActiveChildPage = ref(false);

onActivated(() => {
  console.log('onActivated');
  emit('pageActivated');
});

onDeactivated(() => {
  console.log('onDeactivated');
  emit('pageDeactivated');

  // if (isIosBrowser.value) {
  //   store.state.iosBrowserSwipingBack = false
  // }
});
</script>
