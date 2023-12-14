<template>
  <div class="fixed top-0 right-0 mt-16 flex justify-end m-5">
    <div class="flex justify-end">
      <button v-show = "displayFor !== 'dashboard'" @click="show=true" class="bg-green-300 p-3 rounded ">
        <i class="fa fa-plus" aria-hidden="true"></i>
        <span> Add Sender</span>
      </button>
    </div>

    <Modal @close="show=false" :show="show">
      <h1 class="place-self-center text-center p-2 my-4 bg-blue-300  w-1/3 rounded"> New Sender </h1>
      <SenderInput :apiCall = "postSend" sender = " "/>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import Modal from "@/components/Modal.vue";
import axios from "axios";
import {ApiUrl} from "@/utils/config";
import { getAuthorizationHeader } from "@/utils/authService.ts";
import SenderInput  from "@/components/Senders/SenderInput.vue";


    const show = ref(false);
    const {displayFor} = defineProps(['displayFor']);
    const openModal = () => {
      show.value = true;
    };

const postSend = async (senderData:{})=>{
  console.log('post clicked')
  try {
    // Make the POST request using Axios
    const config = getAuthorizationHeader()
    const response = await axios.post(`${ApiUrl}senders`, senderData, config);

    if (response.status === 200) {
      console.log('is now 200 clicked')
      const data = response.data;
      //emptyInput();
      show.value = false
      return true

    } else {
      console.error('Login failed');
      return false; // Indicate a failed login
    }
  } catch (error) {
    console.error('An error occurred', error);
    return false; // Indicate a failed login
  }
}



</script>
