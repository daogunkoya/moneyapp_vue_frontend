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
import Spinner from '@/components/Spinner.vue';
import DashBoardChart from "@/components/Dashboard/DashBoardChart.vue";
import {useHomeStore} from "@/stores/homeStore";
import { ref, onMounted , watch} from 'vue';




const homeStore = useHomeStore();
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

    const response = await homeStore.fetchHomeContent(pageNumber, type);
    const homeContent =  homeStore.senderTransactionData;

    if (homeContent) {
      const { senders: sendersData, transactions: transData, chartData:ChartInfo } = homeContent;

      if (!type || type === 'senders') {
        senders.value = sendersData;
      }

      if (!type || type === 'transactions') {
        transactions.value = transData;
      }
      chartData.value = ChartInfo
    }

    transactionsDataLoaded.value = true
    sendersDataLoaded.value = true

  } catch (error) {
    console.error('Error loading ', error);
  }
};

onMounted(() => {
  loadSendersTransaction(1, null);
});

// watch([sendersDataLoaded,transactionsDataLoaded], () => {
//   // Check if both senders and transactions have data
//
//   if (apiData.value) {
//     const { senders: sendersData, transactions: transData } = apiData.value;
//
//     if (!requestType.value || requestType.value === 'senders') {
//       senders.value = sendersData;
//     }
//
//     if (!requestType.value || requestType.value === 'transactions') {
//       transactions.value = transData;
//
//       chartData.value = transData.chart_data
//     }
//   }
// });

</script>
