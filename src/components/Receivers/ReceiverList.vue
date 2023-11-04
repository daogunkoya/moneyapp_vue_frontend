<template>
  <div class="p-6">
    <CreateReceiver v-show = "displayFor !== 'dashboard' "  :banksIdentityList = "banksIdentityList" />
    <UpdateReceiver v-show = "displayFor !== 'dashboard' "
                  :showReceiverUpdate= "showReceiverUpdate"
                  :receiver = "activeClickedReceiver"
                    :banksIdentityList = "banksIdentityList"
                  @close = "showReceiverUpdate=false"
    />

    <h1 class=" w-1/3 m-3 p-3 bg-gray-300">Latest Receivers </h1>

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

      <tr v-for="(receiver,index) in receivers" :key="receiver.sender_id">
        <td class="border px-4 py-2">{{ (page - 1) * perPage + index + 1 }}</td>
        <td class="border px-4 py-2">{{ receiver.created_at }}</td>
        <td class="border px-4 py-2">{{ textLimit(receiver.receiver_name,15) }} ({{ receiver.receiver_title }} )</td>
        <td class="border px-4 py-2">{{ receiver.receiver_phone }}</td>

        <td class="border px-4 py-2">
          <router-link :to="`/senders/${receiver.receiver_id}/receivers`">
            <button class="bg-blue-300 p-3 rounded">
              <i :class="'fas fa-exchange' " class="w-6 text-center"></i>
              (0) Transactions
            </button>
          </router-link>
        </td>

        <td class="border px-4 py-2">
          <button class="bg-blue-300 p-3 rounded" @click="receiverUpdate(receiver)">
            <i :class="'fas fa-pencil' " class="w-6 text-center"></i>
            Edit
          </button>
        </td>
      </tr>
      </tbody>
    </table>


    <!--    Page Pagination   -->
    <div class="mt-4">
      <button @click="loadReceivers(page - 1)" :disabled="page === 1"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2">Previous
      </button>
      <span class="text-gray-600">{{ page }} of {{ lastPage }}</span>
      <button @click="loadReceivers(Number(page) + 1)" :disabled="page === lastPage"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg ml-2">Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref,  defineProps} from 'vue';
import CreateReceiver from "@/components/Receivers/CreateReceiver.vue";
import UpdateReceiver from "@/components/Receivers/UpdateReceiver.vue";
import axios from 'axios';
import {ApiUrl} from "@/utils/config";
import {textLimit} from "@/utils/shared";
import {RouterLink} from "vue-router";
import { useSenderStore } from "@/stores/senderStore";
// import {useAuthStore} from "@/stores/piniaStore";

const {receivers: receiversData = [], fetchData, displayFor} = defineProps(['receivers', 'fetchData', 'displayFor']);
const {receiver_count, receiver = [], current_page: currentPage = 1, last_page: finalPage, total, per_page: pageSize, banks_id_list:banksIdList} = receiversData;
const receivers = ref(receiver);
const show = ref(false)
const page:Number = ref<Number>(currentPage);
const perPage = ref(pageSize);
const lastPage = ref(finalPage);
const showReceiverUpdate = ref(false);
const activeClickedReceiver = ref({});
const banksIdentityList = ref(banksIdList);


// const store = useSenderStore();
const receiverUpdate = (receiver:{})=>{
  showReceiverUpdate.value = true
  activeClickedReceiver.value = receiver
}
const loadReceivers = async (pageNumber) => {
  try {
    const response = fetchData(pageNumber, 'senders')
    console.log(pageNumber);

  } catch (error) {
    console.error('Error loading senders', error);
  }
};

</script>

