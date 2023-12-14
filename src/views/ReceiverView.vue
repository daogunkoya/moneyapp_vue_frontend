<template>
  <div>

    <template v-if="receiversDataLoaded">
      <ReceiverList  :fetchData="loadReceivers" />
    </template>
    <template v-else>
      <Spinner />
    </template>

  </div>
</template>



<script setup lang="ts">
import ReceiverList from "@/components/Receivers/ReceiverList.vue";
import Spinner from '@/components/Spinner.vue';
import { useRoute } from 'vue-router';

import { ref, onMounted ,  computed} from 'vue';
import {useReceiverrStore} from "@/stores/receiverStore";

const store = useReceiverrStore();
const receiversDataLoaded = ref(false);
const route = useRoute();
const senderId = computed(() => route.params.senderId);
store.setSenderId(senderId)




const loadReceivers = async  (pageNumber: Number) => {
  receiversDataLoaded.value = false

  try {
    await store.fetchReceivers(pageNumber, senderId.value)
    receiversDataLoaded.value = true
  } catch (error) {
    console.error('Error loading receivers', error);
  }
};

onMounted(() => {
  loadReceivers(1);
});


</script>
