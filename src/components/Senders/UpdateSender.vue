<template>
  <div>
    <Modal @close="showSenderUpdate=false ; $emit('close')" :show="showSenderUpdate">
      <h1 class="place-self-center text-center p-2 my-4 bg-blue-300  w-1/3 rounded">
        Update  <span class="text-white">{{sender.sender_name}} </span></h1>
      <SenderInput :apiCall = "updateSender" :sender = "sender " @apiRequestedCompleted = "showSenderUpdate=false"  />
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



const {displayFor, sender, showSenderUpdate} = defineProps(['displayFor', 'sender', 'showSenderUpdate']);
const show = ref(showSenderUpdate);




const updateSender = async (senderData:{})=>{
  console.log('update clicked')

  try {
    // Make the POST request using Axios
    const config = getAuthorizationHeader()
    const response = await axios.put(`${ApiUrl}senders/${senderData.senderId}`, senderData, config);

    if (response.status === 200) {
      const data = response.data;
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
