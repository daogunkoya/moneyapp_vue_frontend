<template>
  <div class="flex flex-col flex-1 justify-center m-8 max-w-xl  border-2 border-solid border-gray-200">
    <h1 class=" bg-gray-300 p-3"> Quick Calculator</h1>
    <form class="">
      <div class="form-group flex flex-col gap-2 m-8">
        <label> Amount £ </label>
        <input type="text"  v-model="amountFrom" @input="onAmountChange"  class="flex border-b-2  w-4/5 border-blue-500 focus:outline-none bg-transparent">
      </div>
      <div class="form-group flex flex-col gap-2 m-8">
        <label> Amount Naira </label>
        <input type="text" v-model="amountTo" @input="onAmountChange"  class=" border-b-2  w-4/5 border-blue-500  focus:outline-none bg-transparent">
      </div>
      <!-- Currency Destination dropdown -->
      <div class="form-group flex flex-col gap-2 m-8">
        <label for="currencyDestination">  Destination </label>
        <select v-model="selectedDestination" id="currencyDestination" class="border-b-2 w-4/5 border-blue-500  focus:outline-none bg-transparent">
          <option v-for="destination in destinationList" :key="destination.currency_code" :value="destination.currency_code">{{ destination.currency_destination }}</option>
        </select>
      </div>

      <div class="form-group flex-col  gap-2 m-8">
        <input type="text"  v-model="commission" class=" mb-6 border-b-2  w-4/5 border-blue-500  focus:outline-none bg-transparent" placeholder="Commission">
        <input type="text" v-model="totalAmount" class=" border-b-2  w-4/5 border-blue-500  focus:outline-none bg-transparent" placeholder="Total">
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
// Import ref from 'vue'
import { ref, watch, onBeforeMount } from 'vue';
import axios from 'axios';
import {ApiUrl} from "@/utils/config";
import {throttle, camelCase, debounce} from 'lodash';

// Define the types for the reactive variables
let amountTo = ref<number>();
let amountFrom = ref<number>();
let commission = ref<number>();
let totalAmount = ref<number>();
let selectedDestination = ref<string>();
let destinationList = ref<any>();
let conversionType = ref<number>(1);

// Define the type for the fetchData function
const fetchData = async (sendAmount:any): Promise<void> => {
  try {
    const fetchUrl = `${ApiUrl}commissions/value?amount=${sendAmount}&conversion_type=${conversionType.value}`
    console.log(fetchUrl)
    const response = await fetch(fetchUrl);
    const data = await response.json();

    if (data) {
      amountFrom.value = data.send_amount;
      amountTo.value = data.local;
      commission.value = data.commission_value;
      totalAmount.value = data.total_amount;
      console.log(data)
    } else {
      console.error('Data is undefined.');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};



watch([amountFrom, amountTo], ([newAmountFrom, newAmountTo], [oldAmountFrom, oldAmountTo]) => {
  if (newAmountFrom !== oldAmountFrom) {
    conversionType.value = 1
  }

  if (newAmountTo !== oldAmountTo) {
    conversionType.value = 2
  }

});

const debouncedFetchData = debounce((sendAmount:number) => {
  fetchData(sendAmount);
}, 500); // Adjust the debounce delay (e.g., 500ms) based on your needs


const onAmountChange = () => {
  // Your throttled function logic here
  console.log('Amount changed:', amountFrom.value, amountTo.value);
  let sendAmount = amountFrom.value || amountTo.value
  debouncedFetchData(sendAmount);
  //fetchData(sendAmount);
};  // Adjust the throttle delay (e.g., 500ms) based on your needs

onBeforeMount( async () => {
   // Fetch currency options before the component is mounted
  const destinatons = await fetch(`${ApiUrl}currencies/list`);
  let dList = await destinatons.json();
  destinationList.value = dList.destinations
});

</script>
