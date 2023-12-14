<template>
  <div class="fixed top-0 right-0 mt-16 flex justify-end m-5">
    <!--    //@close="show=false" means what happen when i send out close here wha happens is show = false -->
    <Modal @close="closeAction()"
           :show="transactionStore.showUpdateTransactionModal">
      <div class="flex justify-start items-star">
        <h1 class="place-self-center mb-3 text-center p-2  bg-blue-300  w-1/3 rounded"> Update Transaction </h1>
      </div>
      <TransactionInput :apiCall="updateTransaction"
                        senders = ""
                        :idList="idList"
                        :transferTypeList="transferTypeList"
                        updateTransaction = 1
                        :bankList="bankList "/>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import {ref, defineProps, onMounted, watchEffect, onBeforeMount} from 'vue';
import Modal from "@/components/Modal.vue";
import ReceiverInput from "@/components/Receivers/ReceiverInput.vue";
import {useReceiverrStore} from "@/stores/receiverStore";
import TransactionInput from "@/components/Transactions/TransactionInput.vue";
import {useTransactionStore} from "@/stores/transactionStore";


const transactionStore = useTransactionStore();
const receiverStore = useReceiverrStore();
const {displayFor} = defineProps(['displayFor']);



const updateTransaction = async (receiverData:{})=>{
  console.log('add clicked')
  try {
    await receiverStore.addReceivers(receiverData)
  } catch (error) {
    return false; // Indicate a failed login
  }

}


const idList = ref(transactionStore.identityTypeList);
const transferTypeList = ref(transactionStore.transferTypeList);
const bankList = ref(transactionStore.bankList);

const closeAction = ()=>{
  transactionStore.toggleUpdateTransactionModal();
  transactionStore.setActiveTransaction({})
}





</script>
