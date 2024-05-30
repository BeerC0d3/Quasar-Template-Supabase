<template>
  <div
    class="q-slide-item q-item-type overflow-hidden slide-item-bt"
    v-touch-swipe.mouse.left.prevent="swipeLeft"
    v-touch-swipe.mouse.right.prevent="swipeRight"
    @click="clickSlide(props.slideItem.rowId)"
  >
    <div
      class="q-slide-item__right absolute-full row no-wrap items-center justify-end"
      :style="`visibility:${visibility};`"
    >
      <div :style="`transform: scale(${scale});`">
        <q-btn
          flat
          icon="fa-regular fa-pen-to-square"
          size="md"
          @click.prevent.stop="clickButtons('Edit', props.slideItem.rowId)"
        />
        <q-btn flat icon="fa-regular fa-trash-can" size="md" />
      </div>
    </div>
    <div
      class="q-slide-item__content"
      :style="`transform: translate3d(${itemOffset}px,0px,0px);`"
    >
      <div class="q-item q-item-type row no-wrap" role="listitem">
        <div
          class="q-item__section column q-item__section--side justify-center q-item__section--avatar"
          v-if="props.slideItem.avatar"
        >
          <div class="q-avatar">
            <div class="q-avatar__content row flex-center overflow-hidden">
              <img
                src="https://cdn.quasar.dev/img/avatar2.jpg"
                draggable="false"
              />
            </div>
          </div>
        </div>
        <div
          class="q-item__section column q-item__section--main justify-center text-primary text-weight-medium"
        >
          {{ props.slideItem.title }}
          <div class="q-item__label q-item__label--caption text-caption">
            {{ props.slideItem.subTitle }}
          </div>
        </div>
        <div
          class="q-item__section column q-item__section--side justify-center"
        >
          <q-btn
            flat
            icon="fa-solid fa-chevron-right"
            color="primary"
            size="1em"
            v-if="props.slideItem.iconSide"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, PropType, defineProps } from 'vue';
import { useQuasar } from 'quasar';
import { ISlideItem } from 'src/app/Models/System/IModel';

let itemOffset = ref(0);
let scale = ref(0);
let visibility = ref('hidden');
const isSwipe = ref(false);
const $q = useQuasar();

const props = defineProps({
  slideItem: {
    type: Object as PropType<ISlideItem>,
    required: true,
  },
  // delete: {
  //   type: Function,
  //   required: true,

  //},
  edit: {
    type: Function,
    required: true,
  },
  to: {
    type: Function,
    required: true,
  },
});

const clickSlide = (rowId: number) => {
  if (isSwipe.value) swipeReset();
  else props.to(rowId);
};

const swipeLeft = (obj: any) => {
  if (isSwipe.value) swipeReset();
  itemOffset.value = -140;
  scale.value = 1;
  isSwipe.value = true;
  visibility.value = 'visible';
};
const swipeRight = (obj: any) => {
  itemOffset.value = 0;
  scale.value = 0;
  isSwipe.value = false;
};

const swipeReset = () => {
  itemOffset.value = 0;
  scale.value = 0;
};
const clickButtons = (button: string, rowId: number) => {
  if (button == 'Edit') props.edit(rowId);
  swipeReset();
};
</script>
<style lang="scss">
.slide-item-bt {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
.q-slide-item__right {
  background: #3b5999;
  padding: 8px 16px;
}
</style>
