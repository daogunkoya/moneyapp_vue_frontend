<!-- Spinner.vue -->
<template>
  <div class="spinner" :style="{ width: size + 'px', height: size + 'px', borderWidth: borderSize + 'px' }"></div>
</template>

<script setup>
import {ref, defineProps} from 'vue'

const {size:sizeDimension = 40, borderSize:borderDimension = 2} = defineProps(['size', 'borderSize']);

const size = ref(sizeDimension);
const borderSize = ref(borderDimension);
</script>


<style>
.spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto;
  border-radius: 50%;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-top-color: #000;
  animation: spin 1s infinite linear;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
