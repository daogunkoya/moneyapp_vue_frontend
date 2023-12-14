<template>
  <div class="fixed top-0 right-0 mt-16 flex justify-end m-5">
    <div class="flex justify-end">
      <button v-show="displayFor !== 'dashboard'" @click="store.toggleAddReceiverModal()" class="bg-green-300 p-3 rounded ">
        <i class="fa fa-plus" aria-hidden="true"></i>
        <span> Add Receiver</span>
      </button>
    </div>

<!--    //@close="show=false" means what happen when i send out close here wha happens is show = false -->
    <Modal @close="store.toggleAddReceiverModal()" :show="store.showAddReceiverModal">
      <h1 class="place-self-center text-center p-2 my-4 bg-blue-300  w-1/3 rounded"> New Receiver </h1>
      <ReceiverInput :apiCall="addReceiver"/>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import {ref, defineProps, onMounted} from 'vue';
import Modal from "@/components/Modal.vue";
import ReceiverInput from "@/components/Receivers/ReceiverInput.vue";
import {useReceiverrStore} from "@/stores/receiverStore";


const store = useReceiverrStore();
const {displayFor} = defineProps(['displayFor']);
// const openModal = () => {
//   show.value = true;
// };

const addReceiver = async (receiverData:{})=>{
  console.log('add clicked')
  try {
    await store.addReceivers(receiverData)
  } catch (error) {
    console.error('An error occurred', error);
    return false; // Indicate a failed login
  }

}




</script>
