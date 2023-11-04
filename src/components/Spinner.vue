<!-- Spinner.vue -->
<template>
  <div class="spinner"></div>
</template>

<script>
export default {
  name: 'Spinner'
};
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
