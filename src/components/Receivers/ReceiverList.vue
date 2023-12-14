<template>
  <div class="p-1">
    <CreateReceiver v-show = "displayFor !== 'dashboard' " />
    <UpdateReceiver v-show = "displayFor !== 'dashboard' "
    />

    <h1 class=" w-1/3 m-3 p-3 bg-gray-300 rounded-lg">Latest Receivers </h1>

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

      <tr v-for="(receiver,index) in receivers" :key="receiver.senderId">
        <td class="border px-4 py-2">{{ (page - 1) * perPage + index + 1 }}</td>
        <td class="border px-4 py-2">{{ receiver.createdAt }}</td>
        <td class="border px-4 py-2">{{ textLimit(receiver.receiverName,15) }} ({{ receiver.receiverTitle }} )</td>
        <td class="border px-4 py-2">{{ receiver.receiverPhone }}</td>

        <td class="border px-4 py-2">
          <router-link :to="`/senders/${receiver.receiverId}/receivers`">
            <button class="bg-blue-300 p-3 rounded">
              <i :class="'fas fa-exchange' " class="w-6 text-center"></i>
              (0) Transactions
            </button>
          </router-link>
        </td>

        <td class="border px-4 py-2">
          <button class="bg-blue-300 p-3 rounded" @click="showReceiverUpdate(receiver)">
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
import {useReceiverrStore} from "@/stores/receiverStore";
import camelize from "camelize";
import {camelCase} from "lodash";



const store = useReceiverrStore();
const { fetchData, displayFor} = defineProps([ 'fetchData', 'displayFor']);

const {
  receiver_count, receiver = [],
  currentPage = 1,
  lastPage: finalPage,
  total, perPage: pageSize,
  banksIdList} = store.receiverList;

const receivers = ref(receiver);
const show = ref(false)
const page:Number = ref<Number>(currentPage);
const perPage = ref(pageSize);
const lastPage = ref(finalPage);
const activeClickedReceiver = ref({});




const showReceiverUpdate = (receiver:{})=>{
  const  camelCaseReceiver = camelize(receiver);

  activeClickedReceiver.value = receiver

  store.setActiveReceiver(camelCaseReceiver)
  store.setReceiverId(camelCaseReceiver.receiverId)

  store.toggleUpdateReceiverModal()
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

