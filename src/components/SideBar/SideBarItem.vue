<template>
  <!-- Add more navigation links as needed -->
  <div
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      class="flex p-6  border-t border-white " >
        <i :class="'fas fa-' + icon " class="w-6 text-center"></i>
    <template v-if="isMouseOver">
      <div class="w-30">
            <router-Link :to="link">
                <span>
                  <slot></slot>
                </span>
          </router-Link>
        </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import { RouterLink } from 'vue-router';

const {icon, link, isMouseOver} = defineProps(['icon', 'link', 'isMouseOver']);
const emits = defineEmits<{
  (e: 'sidebarHover'): void
}>()


const onMouseEnter = () => {
  emits('sidebarHover');
};

const onMouseLeave = () => {
  emits('sidebarHover');
};

//console.log(isMouseOver)
</script>

<style scoped>
.hidden {
  display: none;
}


</style>