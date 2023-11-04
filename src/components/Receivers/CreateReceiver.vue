<template>
  <div>
    <button v-show="displayFor !== 'dashboard'" @click="show=true" class="bg-blue-300 p-3 rounded ">Add New Receiver
    </button>
    <Modal @close="show=false" :show="show">
      <h1 class="place-self-center text-center p-2 my-4 bg-blue-300  w-1/3 rounded"> New Receiver </h1>
      <ReceiverInput :apiCall="postReceiver" receiver=" "/>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import {ref, defineProps, onMounted} from 'vue';
import Modal from "@/components/Modal.vue";
import axios from "axios";
import {ApiUrl} from "@/utils/config";
import {getAuthorizationHeader} from "@/utils/authService.ts";
import ReceiverInput from "@/components/Receivers/ReceiverInput.vue";

const bankList = ref([]);
const proofIdList = ref([])
const show = ref(false);

const {displayFor} = defineProps(['displayFor']);
const openModal = () => {
  show.value = true;
};
const config = getAuthorizationHeader()
const postReceiver = async (receiverData: {}) => {
  const senderId = ""
  console.log('post clicked')
  try {
    // Make the POST request using Axios
    const response = await axios.post(`${ApiUrl}sender/${senderId}/receivers`, senderData, config);

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

const fetchBankIdData = async () => {

  try {

    const response = await axios.get(`${ApiUrl}bank/list`, config);

    if (response.status === 200) {
      console.log('is now 200 clicked')
      const banksIds = response.data;
      proofIdList.value =
      //emptyInput();
      bankList.value = banksIds.bank
      proofIdList.value = banksIds.proof_id
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

onMounted(()=>{
  fetchBankIdData()

})


</script>
