<template>
  <h1 class=" w-1/3 mt-6 p-3 bg-gray-300">Latest Transaction </h1>
  <div>
    <table class="min-w-full divide-y divide-gray-200">
      <thead>
      <tr>
        <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">#</th>
        <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Created</th>
        <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Type</th>
        <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Sender</th>
        <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Receiver</th>
        <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Local Pay</th>
        <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Agent Commission</th>
        <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Total</th>
        <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Status</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(transaction, index) in transactions" :key="transaction.transaction_id">
        <td class="px-6 py-4 whitespace-no-wrap">{{ (currentPage - 1) * perPage + index + 1 }}</td>
        <td class="px-6 py-4 whitespace-no-wrap">{{ transaction.created_at }}</td>
        <td class="px-6 py-4 whitespace-no-wrap">{{ transaction.type }}</td>
        <td class="px-6 py-4 whitespace-no-wrap">{{ transaction.sender_name }}</td>
        <td class="px-6 py-4 whitespace-no-wrap">{{ transaction.receiver_name }}</td>
        <td class="px-6 py-4 whitespace-no-wrap">{{ transaction.localpay }}</td>
        <td class="px-6 py-4 whitespace-no-wrap">{{ transaction.agent_commission }}</td>
        <td class="px-6 py-4 whitespace-no-wrap">{{ transaction.total_amount }}</td>
        <td class="px-6 py-4 whitespace-no-wrap">{{ transaction.transaction_status==1?'Paid':'Pending' }}</td>
      </tr>
      </tbody>
    </table>
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



  const {transactions:transactionsData = [], fetchData} = defineProps(['transactions', 'fetchData'])
const {transaction_count, transaction = [],current_page :page= 1,last_page:finalPage,total = 1,per_page:pageSize} = transactionsData;
    const transactions = ref(transaction);
    const currentPage = ref(page);
    const itemsPerPage = ref(pageSize);
    const perPage = ref(pageSize);
    const lastPage = ref(finalPage);

    const totalPages = ref(total);
    const displayedTransactions = ref([]);

    // const loadTransactions =  (page) => {
    //   console.log(page)
    //   const response = fetchData(page, 'transactions')
    //
    // };

const loadTransactions = async (pageNumber) => {
  try {

    const response = fetchData(pageNumber, 'transactions')
    console.log(pageNumber);

  } catch (error) {
    console.error('Error loading senders', error);
  }
};



</script>