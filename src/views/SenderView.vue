<template>
  <div>

    <template v-if="sendersDataLoaded">
      <DashBoardSendersList :senders="senders" :fetchData="loadSenders" />
    </template>
    <template v-else>
      <Spinner />
    </template>

  </div>
</template>



<script setup lang="ts">
import DashBoardSendersList from "@/components/Senders/SenderList.vue";
import Spinner from '@/components/Spinner.vue';
import { ref, onMounted , watch} from 'vue';
import {useSenderStore} from "@/stores/senderStore";


const senderStore = useSenderStore();
const senders = ref([]);
const sendersDataLoaded = ref(false);
const apiData = ref()
const requestType = ref()
const search = ref()

const loadSenders = async (pageNumber: Number, type = null) => {
  requestType.value = type
  sendersDataLoaded.value = false

  try {

    const responseData = await senderStore.fetchSenders(pageNumber);

    const senderListData = senderStore.senderList;

    if (senderListData) {
      senders.value = senderListData;
    }

    sendersDataLoaded.value = true

  } catch (error) {
    console.error('Error loading senders', error);
  }
};

onMounted(() => {
  loadSenders(1, null);
});

// watch([sendersDataLoaded], () => {
//   // Check if both senders and transactions have data
//
//   if (sendersDataLoaded.value && apiData.value) {
//     const sendersData= apiData.value;
//   console.log(sendersData)
//       senders.value = sendersData;
//   }
// });

</script>
