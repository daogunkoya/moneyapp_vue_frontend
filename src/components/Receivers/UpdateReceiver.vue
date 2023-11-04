<template>
  <div>
<!--    when child Modal emit @close, it effectively make showReceiverUpdate  to false and also emit  an event called 'close' to the parent component -->
    <Modal @close="showReceiverUpdate=false ; $emit('close')" :show="showReceiverUpdate">
      <h1 class="place-self-center text-center p-2 my-4 bg-blue-300  w-1/3 rounded">
        Update  <span class="text-white">{{receiver.receiver_name}} </span></h1>
      <ReceiverInput :apiCall = "updateSender" :receiver = "receiver " @apiRequestedCompleted = "showReceiverUpdate=false" :banksIdentityList="banksIdentityList"  />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import Modal from "@/components/Modal.vue";
import axios from "axios";
import {ApiUrl} from "@/utils/config";
import { getAuthorizationHeader } from "@/utils/authService.ts";
import ReceiverInput  from "@/components/Receivers/ReceiverInput.vue";



const {displayFor, receiver, showReceiverUpdate, banksIdentityList} = defineProps(['displayFor', 'receiver', 'showReceiverUpdate', 'banksIdentityList']);
const show = ref(showReceiverUpdate);




const updateSender = async (receiverData:{})=>{
  console.log('update clicked')
const senderId  = "";
  try {
    // Make the POST request using Axios
    const config = getAuthorizationHeader()
    const response = await axios.put(`${ApiUrl}sender/${senderid}/${senderData.senderId}`, receiverData, config);

    if (response.status === 200) {
      const data = response.data;
      return true

    } else {
      console.error('Something went wrong');
      return false; // Indicate a failed login
    }
  } catch (error) {
    console.error('An error occurred', error);
    return false; // Indicate a failed login
  }
}



</script>
