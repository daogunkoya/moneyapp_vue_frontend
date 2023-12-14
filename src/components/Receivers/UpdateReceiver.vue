<template>
  <div>
<!--    when child Modal emit @close, it effectively make showReceiverUpdate  to false and also emit  an event called 'close' to the parent component -->
    <Modal @close="closeAction"
           :show="store.showUpdateReceiverModal">
      <h1 class="place-self-center text-center p-2 my-4 bg-blue-300  w-1/3 rounded">
        Update  <span class="text-white">{{store.activeReceiver.receiverName}} </span></h1>
      <ReceiverInput :apiCall = "updateReceiver" @apiRequestedCompleted = ""  />
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
import {useReceiverrStore} from "@/stores/receiverStore";
import {defineEmits} from "vue/dist/vue";


const store = useReceiverrStore()
const receiver = ref(store.activeReceiver);
const receiverName = ref(receiver.receiverName);
const {displayFor} = defineProps(['displayFor']);

const emit = defineEmits<{
  (e: 'close'): void
}>()


const updateReceiver = async (receiverData:{})=>{
  console.log('update clicked')
  try {
    await store.updateReceivers(receiverData)
  } catch (error) {
    console.error('An error occurred', error);
    return false; // Indicate a failed login
  }

}

const closeAction = ()=>{
  store.toggleUpdateReceiverModal();
  emit('close');
  store.setActiveReceiver({})
}



</script>
