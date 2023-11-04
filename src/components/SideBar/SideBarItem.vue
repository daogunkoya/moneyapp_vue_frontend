<template>
  <!-- Add more navigation links as needed -->
  <div class="flex gap-6 pt-6 border-t border-white ">
    <i :class="'fas fa-' + icon " class="w-6 text-center"></i> 
    <div class="w-30">
        <router-Link :to="link">
             <slot></slot>
      </router-Link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps(['icon', 'link']);
const icon = ref(props.icon);
const link = ref(props.link);
</script>