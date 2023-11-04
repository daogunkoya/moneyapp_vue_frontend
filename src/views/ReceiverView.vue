<template>
  <div>

    <template v-if="receiversDataLoaded">
      <ReceiverList :receivers="receivers" :fetchData="loadReceivers" />
    </template>
    <template v-else>
      <Spinner />
    </template>

  </div>
</template>



<script setup lang="ts">
import ReceiverList from "@/components/Receivers/ReceiverList.vue";
import { getAuthorizationHeader } from "@/utils/authService.ts"
import Spinner from '@/components/Spinner.vue';
import { useRoute } from 'vue-router';

import { ref, onMounted , watch, computed} from 'vue';
import axios from 'axios';
import { ApiUrl } from "@/utils/config";

const receivers = ref([]);
const receiversDataLoaded = ref(false);
const apiData = ref()
const requestType = ref()
const search = ref()
const route = useRoute();
const senderId = computed(() => route.params.senderId);



const loadReceivers = async (pageNumber: Number, type = null) => {
  requestType.value = type
  receiversDataLoaded.value = false

  try {
    const config = getAuthorizationHeader()
    const response = await axios.get(
        `${ApiUrl}sender/${senderId.value}/receivers?page=${pageNumber}`,
        config
    );

    const responseData = response.data;

    console.log(responseData)

    receiversDataLoaded.value = true
    apiData.value = responseData

  } catch (error) {
    console.error('Error loading receivers', error);
  }
};

onMounted(() => {
  loadReceivers(1, null);
});

watch([receiversDataLoaded], () => {
  // Check if both senders and transactions have data
  if (receiversDataLoaded.value && apiData.value) {
      receivers.value = apiData.value
  }

});

</script>
