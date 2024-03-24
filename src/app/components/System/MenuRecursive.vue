<template>
  <div class="app-drawer">
    <div v-if="menuChildren.length == 0">
      <q-item :to="url" clickable v-ripple class="q-item-active">
        <q-item-section avatar class="item-bt">
          <q-avatar>
            <q-icon :name="icon" class="icon-color" />
          </q-avatar>
        </q-item-section>
        <q-item-section>{{ title }}</q-item-section>
      </q-item>
    </div>
    <div v-else>
      <div v-if="menuChildren.length > 0">
        <q-expansion-item
          :hide-expand-icon="id == 1"
          :disable="id == 1"
          :icon="icon"
          :label="title"
          :default-opened="id == 1"
        >
          <menu-recursive
            v-for="child in menuChildren"
            :key="child.id"
            v-bind="child"
          >
          </menu-recursive>
        </q-expansion-item>
      </div>
      <div v-else>
        <q-item clickable v-ripple>
          <q-item-section class="">{{ title }}</q-item-section>
        </q-item>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { IMenu } from 'src/app/Models/System/IModel';

interface Props {
  id: number;
  icon: string;
  title: string;
  url: string;
  menuChildren: IMenu[];
}

const props = withDefaults(defineProps<Props>(), {
  menuChildren: () => [],
});
</script>

<style lang="scss">
.app-drawer {
  @import 'src/css/drawer.scss';
}
</style>
