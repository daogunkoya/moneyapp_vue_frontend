<template>
  <div class="fixed top-0 right-0 mt-16 flex justify-end m-5">
    <div class="flex justify-end">
        <button v-show="displayFor !== 'dashboard'" @click="transactionStore.toggleAddTransactionModal()" class="bg-blue-300 p-3 rounded ">
          <i class="fa fa-paper-plane" aria-hidden="true"></i>
          <span> Send Moneys</span>
        </button>
    </div>
<!--    //@close="show=false" means what happen when i send out close here wha happens is show = false -->
    <Modal @close="transactionStore.toggleAddTransactionModal()" :show="transactionStore.showAddTransactionModal">
      <div class="flex justify-start items-star">
      <h1 class="place-self-center mb-3 text-center p-2  bg-blue-300  w-1/3 rounded"> Send Money </h1>
      </div>
      <TransactionInput :apiCall="addReceiver" :senders = "senders"/>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import {ref, defineProps, onMounted} from 'vue';
import Modal from "@/components/Modal.vue";
import ReceiverInput from "@/components/Receivers/ReceiverInput.vue";
import {useReceiverrStore} from "@/stores/receiverStore";
import TransactionInput from "@/components/Transactions/TransactionInput.vue";
import {useSenderStore} from "@/stores/senderStore";
import {useTransactionStore} from "@/stores/transactionStore";


const transactionStore = useTransactionStore();
const senders = ref({})
const receiverStore = useReceiverrStore();
const senderStore = useSenderStore();
const {displayFor} = defineProps(['displayFor']);



const addReceiver = async (receiverData:{})=>{
  console.log('add clicked')
  try {
    await receiverStore.addReceivers(receiverData)
  } catch (error) {
    return false; // Indicate a failed login
  }

}

const loadSenders = async ()=>{
  const response = await senderStore.fetchSenders(0);
  const senderList = senderStore.senderList
  const {sender} = senderList
  senders.value = sender;
  //console.log('senders',sender)

}


onMounted(() => {
  loadSenders()
})

</script>
