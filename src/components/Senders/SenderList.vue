<template>
  <div class="p-6">
    <CreateSender v-show = "displayFor !== 'dashboard' " />
    <UpdateSender v-show = "displayFor !== 'dashboard' "
                  :showSenderUpdate= "showSenderUpdate"
                  :sender = "activeClickedSender"
                  @close = "showSenderUpdate=false"
    />

    <h1 class=" w-1/3 m-3 p-3 bg-gray-300">Latest Senders </h1>

    <table class="min-w-full table-auto text-center">
      <thead>
      <tr>
        <th class="px-4 py-2">No</th>
        <th class="px-4 py-2">Created</th>
        <th class="px-4 py-2">Name</th>
        <th class="px-4 py-2">Mobile</th>
        <th colspan="2" class="px-4 py-2">Actions</th>
      </tr>
      </thead>
      <tbody>

      <tr v-for="(sender,index) in senders" :key="sender.sender_id">
        <td class="border px-4 py-2">{{ (page - 1) * perPage + index + 1 }}</td>
        <td class="border px-4 py-2">{{ sender.created_at }}</td>
        <td class="border px-4 py-2">{{ textLimit(sender.sender_name,15) }} ({{ sender.sender_title }} )</td>
        <td class="border px-4 py-2">{{ sender.sender_phone }}</td>

          <td class="border px-4 py-2">
            <router-link :to="`/senders/${sender.sender_id}/receivers`">
            <button class="bg-blue-300 p-3 rounded">
              <i :class="'fas fa-users' " class="w-6 text-center"></i>
              ({{ sender.count_sender_receivers }}) Receivers
            </button>
            </router-link>
          </td>

<!--        <router-link :to="`/senders/${sender.sender_id}/receivers`">-->
          <td class="border px-4 py-2">
            <button class="bg-blue-300 p-3 rounded" @click="senderUpdate(sender)">
              <i :class="'fas fa-pencil' " class="w-6 text-center"></i>
             Edit
            </button>
          </td>
<!--        </router-link>-->
      </tr>
      </tbody>
    </table>

<!--    Page Pagination   -->
    <div class="mt-4">
      <button @click="loadSenders(page - 1)" :disabled="page === 1"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2">Previous
      </button>
      <span class="text-gray-600">{{ page }} of {{ lastPage }}</span>
      <button @click="loadSenders(Number(page) + 1)" :disabled="page === lastPage"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg ml-2">Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref,  defineProps} from 'vue';
import CreateSender from "@/components/Senders/CreateSender.vue";
import UpdateSender from "@/components/Senders/UpdateSender.vue";
import axios from 'axios';
import {ApiUrl} from "@/utils/config";
import {textLimit} from "@/utils/shared";
import {RouterLink} from "vue-router";
import { useSenderStore } from "@/stores/senderStore";
import {useAuthStore} from "@/stores/piniaStore";

const {senders: sendersData = [], fetchData, displayFor} = defineProps(['senders', 'fetchData', 'displayFor']);
const {sender_count, sender = [], current_page: currentPage = 1, last_page: finalPage, total, per_page: pageSize} = sendersData;
const senders = ref(sender);
const show = ref(false)
const page:Number = ref<Number>(currentPage);
const perPage = ref(pageSize);
const lastPage = ref(finalPage);
const showSenderUpdate = ref(false);
const activeClickedSender = ref({});


const store = useSenderStore();
const senderUpdate = (sender)=>{

  showSenderUpdate.value = true
  activeClickedSender.value = sender
}
const loadSenders = async (pageNumber) => {
  try {
    const response = fetchData(pageNumber, 'senders')
    console.log(pageNumber);

  } catch (error) {
    console.error('Error loading senders', error);
  }
};

</script>

