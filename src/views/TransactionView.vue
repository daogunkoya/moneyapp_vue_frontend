<template>
  <div>
    <template v-if="transactionsDataLoaded">
      <TransactionList :transactions="transactions" :fetchData="loadTransaction"  />
    </template>
    <template v-else>
      <Spinner />
    </template>
  </div>
</template>



<script setup lang="ts">
import TransactionList from "@/components/Transactions/TransactionList.vue";
import { getAuthorizationHeader } from "@/utils/authService.ts"
import Spinner from '@/components/Spinner.vue';

import { ref, onMounted , watch} from 'vue';
import axios from 'axios';
import { ApiUrl } from "@/utils/config";
import {useTransactionStore} from "@/stores/transactionStore";

const transactionStore = useTransactionStore();
const transactions = ref([]);
const transactionsDataLoaded = ref(false);
const apiData = ref()
const requestType = ref()

const loadTransaction = async (pageNumber: Number, type = null) => {
  transactionsDataLoaded.value = false
  requestType.value = type
  try {
    const response = await transactionStore.fetchTransactions(pageNumber);
    if(transactionStore.transactionsDataLoaded){
      transactionsDataLoaded.value = true
      transactions.value = transactionStore.transactionList
    }


    //console.log(transactionStore.transactionList)

  } catch (error) {
    console.error('Error loading senders', error);
  }
};

onMounted(() => {
  loadTransaction(1, null);
});


</script>
