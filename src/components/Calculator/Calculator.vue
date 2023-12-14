<template>

  <div class="flex flex-col justify-center border-2 border-solid border-gray-200">
    <button @click="toggleCalculator = !toggleCalculator" class="flex items-center p-4 ">
      <i class="fa fa-calculator mr-2" aria-hidden="true"></i>
<!--      <span>Quick Calculator</span>-->
    </button>

    <template v-if="toggleCalculator">
      <form class="">
        <div class="form-group flex flex-col gap-2 m-8">
          <label> Amount £ </label>
          <input type="text"  v-model="amountFrom" @input="onAmountChange(1)"  class="flex border-b-2  w-4/5 border-blue-500 focus:outline-none bg-transparent">
        </div>
        <div class="form-group flex flex-col gap-2 m-8">
          <label> Amount Naira </label>
          <input type="text" v-model="amountTo" @input="onAmountChange(2)"  class=" border-b-2  w-4/5 border-blue-500  focus:outline-none bg-transparent">
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
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeMount } from 'vue';
import {ApiUrl} from "@/utils/config";
import {useTransactionStore} from "@/stores/transactionStore";
import { debounce} from 'lodash';

// Define the types for the reactive variables
const toggleCalculator = ref(false)
const store = useTransactionStore();
let amountTo = ref<number>();
let amountFrom = ref<number>();
let commission = ref<number>();
let totalAmount = ref<number>();
let selectedDestination = ref<string>();
let destinationList = ref<any>();
let conversionType = ref<number>(1);


const onAmountChange =  debounce(async ( conversionType: number): Promise<void> => {
  let sendAmount = conversionType === 1?amountFrom.value : amountTo.value;
  try {
    const fetchUrl = await store.calculateSendAmount(sendAmount, conversionType);
    const data = store.sendAmountCalculationResponse;

    if (data) {
      amountFrom.value = data.sendAmount;
      amountTo.value = data.local;
      commission.value = data.commissionValue;
      totalAmount.value = data.totalAmount;
      console.log(data);
    } else {
      console.error('Data is undefined.');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}, 500);




// watch([amountFrom, amountTo], ([newAmountFrom, newAmountTo], [oldAmountFrom, oldAmountTo]) => {
//   if (newAmountFrom !== oldAmountFrom) {
//     conversionType.value = 1
//   }
//
//   if (newAmountTo !== oldAmountTo) {
//     conversionType.value = 2
//   }
//
// });


// const onAmountChange = (conversionType) => {
//   // Your throttled function logic here
//   console.log('Amount changed:', amountFrom.value, amountTo.value);
//   let sendAmount = amountFrom.value || amountTo.value
//
//   fetchData(sendAmount, conversionType);
//
// };  // Adjust the throttle delay (e.g., 500ms) based on your needs

onBeforeMount( async () => {
   // Fetch currency options before the component is mounted
  const destinatons = await fetch(`${ApiUrl}currencies/list`);
  let dList = await destinatons.json();
  destinationList.value = dList.destinations
});

</script>
