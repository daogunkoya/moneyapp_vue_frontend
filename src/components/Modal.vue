<template  >
  <transition name="modal-fade">
    <div class="modal" v-if="show">
      <div class=" flex flex-col  modal-content w-2/4">
        <div class="close " @click="$emit('close')">&times;</div>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const { show } = defineProps(['show']);
//console.log(show)

//const { emit } = defineEmits(['close']);

const closeModal = () => {
  $emit('close');
};
</script>



<style scoped>
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
}

.modal-content {
  background-color: #fefefe;
  padding: 10px 20px;
  border: 1px solid #888;
  max-width: 80%;
  transition: all 0.3s ease;
}

.close {
  color: #aaa;
  display: flex;
  justify-content: flex-end;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover {
  color: black;
}
</style>

<style>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
