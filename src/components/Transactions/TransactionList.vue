<template>
  <CreateTransaction v-show = "displayFor !== 'dashboard' " />

  <UpdateTransaction v-show = "displayFor !== 'dashboard' "/>
  <TransactionSummary/>

<!--                :showSenderUpdate= "showSenderUpdate"-->
<!--                :sender = "activeClickedSender"-->
<!--                @close = "showSenderUpdate=false"-->

  <div class="flex items-center justify-start ">
    <h1 class="text-center w-1/5 m-3 p-3 bg-gray-300 rounded-lg">Latest Transaction </h1>
  </div>

  <div>
    <table class="min-w-full divide-y divide-gray-200">
      <thead>
      <tr>
        <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">#</th>
        <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Created</th>
        <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Code</th>
        <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Type</th>
        <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Sender</th>
        <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Receiver</th>
        <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Local Pay</th>
        <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Comm</th>
        <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Total</th>
        <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Status</th>
        <th colspan = "2" class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Actions</th>

      </tr>
      </thead>
      <tbody>
      <tr v-for="(transaction, index) in transactions" :key="transaction.transactionId">
        <td class="px-6 py-4 whitespace-no-wrap">{{ (currentPage - 1) * perPage + index + 1 }}</td>
        <td class="px-6 py-4 whitespace-no-wrap">{{ transaction.createdAt }}</td>
        <td class="px-6 py-4 whitespace-no-wrap">{{ transaction.transactionCode }}</td>
        <td class="px-6 py-4 whitespace-no-wrap">{{ transaction.transactionType }}</td>
        <td class="px-6 py-4 whitespace-no-wrap">{{ transaction.senderName }}</td>
        <td class="px-6 py-4 whitespace-no-wrap">{{ transaction.receiverName }}</td>
        <td class="px-6 py-4 whitespace-no-wrap">{{ transaction.localAmount }}</td>
        <td class="px-6 py-4 whitespace-no-wrap">{{ transaction.agentCommission }}</td>
        <td class="px-6 py-4 whitespace-no-wrap">{{ transaction.totalAmount }}</td>
        <td class="px-6 py-4 whitespace-no-wrap">{{ transaction.transactionSatus==1?'Paid':'Pending' }}</td>
        <td class="border px-6 py-4">
            <button
                @click="showTransactionUpdate(transaction)"
                class="bg-blue-300 p-3 rounded">
              <i :class="'fas fa-pencil' " class="w-6 text-center"></i>
              Edit
            </button>
        </td>

        <td class="border px-6 py-4">
          <button class="bg-blue-300 p-3 rounded" @click="">
            <i :class="'fas fa-download' " class="w-6 text-center"></i>
            Receipt
          </button>
        </td>
      </tr>
      </tbody>
    </table>

<!--    //Pagination-->
    <div class="mt-4">
      <button
          @click="loadTransactions(Number(currentPage) - 1)"
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Previous
      </button>
      <span class="text-gray-600 p-3">{{ currentPage }} of {{ lastPage }}</span>
      <button
          @click="loadTransactions(Number(currentPage) + 1)"
          :disabled="currentPage >= totalPages"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Next
      </button>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, defineProps } from 'vue';
import axios from 'axios';
import { ApiUrl } from '@/utils/config';
import {RouterLink} from "vue-router";
import {useTransactionStore} from "@/stores/transactionStore";
import CreateTransaction from "@/components/Transactions/CreateTransaction.vue";
import UpdateTransaction from "@/components/Transactions/UpdateTransaction.vue";
import TransactionSummary from "@/components/Transactions/TransactionSummary.vue";
import {useReceiverrStore} from "@/stores/receiverStore";
import camelize from "camelize";




  const transactionStore = useTransactionStore();
  const receiverStore = useReceiverrStore();

  const {transactions:transactionsData = [], fetchData, displayFor} = defineProps(['transactions', 'fetchData', 'displayFor'])
  const {transactionCount, transaction = [],currentPage :page= 1,lastPage:finalPage,total = 1,perPage:pageSize} = transactionsData;

  const transactions = ref(transaction);
    const currentPage = ref(page);
    const itemsPerPage = ref(pageSize);
    const perPage = ref(pageSize);
    const lastPage = ref(finalPage);
    const activeClickedTransaction = ref();

    const totalPages = ref(total);
    const displayedTransactions = ref([]);

const showTransactionUpdate =  (transaction)=>{

  activeClickedTransaction.value = transaction

  transactionStore.setActiveTransaction(transaction)
  transactionStore.toggleUpdateTransactionModal()
}

const loadTransactions = async (pageNumber) => {
  try {
    const response = fetchData(pageNumber, 'transactions')
  } catch (error) {
    console.error('Error loading senders', error);
  }
};



</script>