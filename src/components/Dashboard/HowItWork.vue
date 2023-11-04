<template>
  <div class="flex flex-col items-center">
    <h1 class="m-6  p-6  font-bold border shadow-xl">How IT Works</h1>
    <!--      <button @click="flash('success is me')" class="bg-blue-500 p-10 rounded-full">click</button>-->
    <!--      <input type="text" v-model="trend" class="border border-black">-->
    <div class="flex items-center gap-12">
      <div class="rounded-lg p-6 bg-white shadow-xl">
        <MainItem link="" icon="user">
          <template #title>
            Create Sender
          </template>
        </MainItem>
      </div>

      <i class="fas fa-arrow-right text-3xl"></i>

      <div class="rounded-lg p-6 bg-white shadow-xl">
        <MainItem link="" icon="users">
          <template #title>
            Create Receiver
          </template>
        </MainItem>
      </div>

      <i class="fas fa-arrow-right text-3xl"></i>

      <div class="rounded-lg p-6 bg-white shadow-xl">
        <MainItem link="" icon="money-bill">
          <template #title>
            Send Money
          </template>
        </MainItem>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStorage } from '@//composables/useStorage';
import {useFlash} from '@//composables/useFlash'
import MainItem from "@/components/main/MainItem.vue";

let trend =  useStorage('locker')
let {flash} = useFlash()
//   export default {
//     mixins:[flash]
//   };
</script>
