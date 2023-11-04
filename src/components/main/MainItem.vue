<template>
    <div class="flex flex-col gap-7 items-center">
      <h3 class="">
        <slot name="title"></slot>
      </h3>
      <div class="flex items-center justify-center w-20 h-20 rounded-full border border-black">
        <i :class="'fas fa-3x fa-' + icon"></i>
      
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
   import { ref } from "vue";

  const props = defineProps(["icon"]);
  const icon = ref(props.icon);

  // let testme = ()=>{
  //    flash('success!')
  // }
  //const icon = $ref(icon);

  
  </script>
  