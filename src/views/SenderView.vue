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
import { getAuthorizationHeader } from "@/utils/authService.ts"
import Spinner from '@/components/Spinner.vue';

import { ref, onMounted , watch} from 'vue';
import axios from 'axios';
import { ApiUrl } from "@/utils/config";

const senders = ref([]);
const sendersDataLoaded = ref(false);
const apiData = ref()
const requestType = ref()
const search = ref()

const loadSenders = async (pageNumber: Number, type = null) => {
  requestType.value = type
  sendersDataLoaded.value = false

  try {
    const config = getAuthorizationHeader()
    const response = await axios.get(
        `${ApiUrl}senders?page=${pageNumber}`,
        config
    );

    const responseData = response.data;

    sendersDataLoaded.value = true


    apiData.value = responseData

  } catch (error) {
    console.error('Error loading senders', error);
  }
};

onMounted(() => {
  loadSenders(1, null);
});

watch([sendersDataLoaded], () => {
  // Check if both senders and transactions have data

  if (sendersDataLoaded.value && apiData.value) {
    const sendersData= apiData.value;

      senders.value = sendersData;


  }
});

</script>
