<template>
  <div>
    <HowItWork />
      <DashBoardChart :chartData = "chartData"  />
    <template v-if="sendersDataLoaded">
      <SenderList displayFor = "dashboard"  :senders="senders" :fetchData="loadSendersTransaction" />
    </template>
    <template v-else>
      <Spinner />
    </template>

    <template v-if="transactionsDataLoaded">
      <TransactionList :transactions="transactions" :fetchData="loadSendersTransaction" />
    </template>
    <template v-else>
      <Spinner />
    </template>
  </div>
</template>



<script setup lang="ts">
import HowItWork from "@/components/Dashboard/HowItWork.vue";
import SenderList from "@/components/Senders/SenderList.vue";
import TransactionList from "@/components/Transactions/TransactionList.vue";
import { getAuthorizationHeader } from "@/utils/authService.ts"
import Spinner from '@/components/Spinner.vue';
import DashBoardChart from "@/components/Dashboard/DashBoardChart.vue";

import { ref, onMounted , watch} from 'vue';
import axios from 'axios';
import { ApiUrl } from "@/utils/config";

const senders = ref([]);
const transactions = ref([]);
const chartData = ref({});
const transactionsDataLoaded = ref(false);
const sendersDataLoaded = ref(false);
const apiData = ref()
const requestType = ref()

const loadSendersTransaction = async (pageNumber: Number, type = null) => {
  requestType.value = type

  transactionsDataLoaded.value = !(!type || type === 'transactions')
  sendersDataLoaded.value = !(!type || type === 'senders')

  try {

    const config = getAuthorizationHeader()
    const response = await axios.get(
        `${ApiUrl}?page=${pageNumber}&type=${type}`,
        config
    );

    const responseData = response.data;


    transactionsDataLoaded.value = true
    sendersDataLoaded.value = true


    apiData.value = responseData

  } catch (error) {
    console.error('Error loading senders', error);
  }
};

onMounted(() => {
  loadSendersTransaction(1, null);
});

watch([sendersDataLoaded,transactionsDataLoaded], () => {
  // Check if both senders and transactions have data

  if (apiData.value) {
    const { senders: sendersData, transactions: transData } = apiData.value;

    if (!requestType.value || requestType.value === 'senders') {
      senders.value = sendersData;
    }

    if (!requestType.value || requestType.value === 'transactions') {
      transactions.value = transData;

      chartData.value = transData.chart_data
    }
  }
});

</script>
