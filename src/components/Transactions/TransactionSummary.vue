<template>
  <Modal @close="closeAction"
         :show="transactionStore.showSummaryPage">
          <div>
            <div class="flex items-center justify-start">
              <h1 class="text-center w-full m-3 p-3 bg-gray-300 rounded-lg">Transaction Summary</h1>
            </div>

            <div v-if="selectedReceiver">
              <div class="flex justify-between p-4 border-b">
                <p><strong>Receiver Name:</strong></p>
                <p>{{ selectedReceiver.receiverName }}</p>
              </div>
              <div class="flex justify-between p-4 border-b">
                <p><strong>Sender Name:</strong></p>
                <p>{{ selectedSender.senderName }}</p>
              </div>
              <div class="flex justify-between p-4 border-b">
                <p><strong>Sender Phone:</strong></p>
                <p>{{ selectedSender.senderPhone }}</p>
              </div>
              <div class="flex justify-between p-4 border-b">
                <p><strong>Receiver Bank Name:</strong></p>
                <p>{{ selectedReceiver.bank['name'] }}</p>
              </div>
              <div class="flex justify-between p-4">
                <p><strong>Account Number:</strong></p>
                <p>{{ selectedReceiver.accountNumber }}</p>
              </div>

              <div class="flex justify-between p-4">
                <p><strong>Transfer Option:</strong></p>
                <p>{{ selectedReceiver.transferType }}</p>
              </div>

              <div class="flex justify-between p-4">
                <p><strong>Amount To Send:</strong></p>
                <p>{{ transactionData.sendAmount }}</p>
              </div>

              <div class="flex justify-between p-4">
                <p><strong>Local Amount:</strong></p>
                <p>{{ transactionData.local }}</p>
              </div>

              <div class="flex justify-between p-4">
                <p><strong>Total Amount:</strong></p>
                <p>{{ transactionData.totalAmount }}</p>
              </div>

              <div class="flex justify-between p-4">
                <p><strong>Commission:</strong></p>
                <p>{{ transactionData.commissionValue }}</p>
              </div>

              <div class="flex justify-between p-4">
                <p><strong>Exchange Rate:</strong></p>
                <p>{{ transactionData.rate }}</p>
              </div>
            </div>
            <div v-else>
              <p>No transaction details available.</p>
            </div>

            <div class="flex  justify-center items-center">
              <button class="flex-1 bg-blue-300 p-3 m-2 rounded' "
                      type="submit"
                      @click="submitTransaction">Submit
              </button>
              <button class="flex-1 bg-red-300 p-3 m-2 rounded' "
                      type="submit"
                     >Make Payment
              </button>
            </div>
      </div>
  </Modal>
</template>

<script setup lang="ts">
import {ref, defineProps, defineEmits, watchEffect} from 'vue';

import {useTransactionStore} from "@/stores/transactionStore";
import Modal from "@/components/Modal.vue";
import swal from "sweetalert";
import { useRouter } from 'vue-router';

const closeAction = ()=>{
  transactionStore.showSummaryPage = false
}

const router = useRouter();

const transactionStore = useTransactionStore();
const selectedReceiver = ref();
const selectedSender = ref();
const transactionData = ref();

const submitTransaction =  async ()=>{
  const postTransactionData =  {
    "conversion_type": transactionData.value['conversionType'],
    "receiver_id": selectedReceiver.value['receiverId'],
    "amount_sent":transactionData.value['sendAmount'],
  }
  transactionStore.showSummaryPage = false;
 const sendTrans = await transactionStore.addTransaction(postTransactionData);




  swal("Succesfully Sent!", "Transaction now complete", "success");

  router.push('/transactions');

}


// Retrieve and update the values when the component is mounted

watchEffect(() => {
  selectedReceiver.value = transactionStore.selectedReceiver;
  selectedSender.value = transactionStore.selectedSender;
  transactionData.value = transactionStore.transactionData;
});


</script>
