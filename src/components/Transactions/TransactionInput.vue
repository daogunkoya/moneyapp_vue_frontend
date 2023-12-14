<template>
  <form @submit.prevent="submitTransaction" class="flex flex-col items-center space-y-4">
    <div v-show="senders" class="flex flex-col w-full items-center">
        <label class="flex items-center min-w-0 w-3/5 border border-1">
          <span class="w-2/5 p-2 text-gray-400">Select Sender</span>
          <select v-model="selectedSender" class="border-none focus:outline-none min-w-0 w-full p-2"
                   @change = "fetchReceivers(selectedSender)">
            <option v-for="(sender, index) in senders" :key="index"
                    :value="sender">
              {{ sender.senderName }}
            </option>
          </select>
        </label>

        <label class="flex items-center min-w-0 w-3/5 border border-1">
          <span class="w-2/5 p-2 text-gray-400">Select Receiver</span>
          <select v-model="selectedReceiver" class="border-none focus:outline-none min-w-0 w-full p-2"  @change = "onSelectReceiver(selectedReceiver)">
            <option v-for="(receiver, index) in receivers" :key="index"
                    :value="receiver">
              {{ receiver.receiverName }}
            </option>
          </select>
          <span v-show="loadingReceiver" class="ml-2">
            <Spinner :size="20" />
          </span>
        </label>
    </div>

    <div class="flex flex-col w-full items-center justify-center bg-gray-200 my-5 p-2 rounded-lg">
      <div class="flex w-full">
        <div class="flex flex-col w-1/2 p-2">
          <label class="">Receiver First Name</label>
          <input class="w-full border border-1 focus:outline-none p-2" type="text" v-model="receiverFirstName"
                 placeholder="First Name"
                 required/>
        </div>
        <div class="flex flex-col w-1/2 p-2">
          <label class="">Receiver Last Name</label>
          <input class="w-full border border-1 focus:outline-none p-2" type="text" v-model="receiverLastName"
                 placeholder="Last Name"
                 required/>
        </div>
      </div>

      <div class="flex w-full">
        <div class="flex flex-col w-1/2 p-2">
          <label>Receiver Phone</label>
          <input class="w-full border border-1 focus:outline-none p-2" type="text" v-model="receiverPhone"
                 placeholder="Receiver Phone"
                 required/>
        </div>
        <div class="flex flex-col w-1/2 p-2">
          <label>Transfer Option</label>
          <select v-model="receiverTransferOption" class="w-full border border-1 focus:outline-none p-2" required>
            <option v-for="(type, index) in transferTypes" :key="index" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
      </div>

      <div class="flex w-full">
        <div class="flex flex-col w-1/2 p-2">
          <label>Receiver Bank</label>
          <select v-model="receiverBank" class="w-full border border-1 focus:outline-none p-2" required>
            <option v-for="(bank, index) in bankList" :key="index" :value="bank">
              {{ bank }}
            </option>
          </select>
        </div>
        <div class="flex flex-col w-1/2 p-2">
          <label>Receiver Account</label>
          <input class="w-full border border-1 focus:outline-none p-2" type="text" v-model="receiverAccountNumber"
                 placeholder="Receiver Account Number"
                 required/>
        </div>
      </div>
    </div>



    <input class="border focus:outline-none border-1 min-w-0 w-3/5 p-2" type="tel" v-model="amountToSend"
           placeholder="Amount To Send"  @input="onAmountChange(1)"  required/>
    <input class="border border-1 focus:outline-none min-w-0 w-3/5 p-2" type="text" v-model="amountToCollect"
           placeholder="Amount To Collect" @input="onAmountChange(2)"
           required/>

    <input class="border border-1 focus:outline-none min-w-0 w-3/5 p-2" type="text" v-model="commission"
           placeholder="Commission" readonly
           required/>

    <input class="border border-1 focus:outline-none min-w-0 w-3/5 p-2" type="text" v-model="totalAmount"
           placeholder="Total Amount" readonly
           required/>

    <input class="border border-1 focus:outline-none min-w-0 w-3/5 p-2" type="text" v-model="exchangeRate"
           placeholder="Exchange Rate" readonly
           required/>

    <button :class="[canSend ? 'bg-blue-300 p-3 rounded' : 'bg-blue-100 p-3 rounded']"
            type="submit"
            :disabled="!canSend">
      {{ !transactionId ? "Send Money" : "Update Transaction" }}

    </button>

  </form>

</template>

<script setup lang="ts">
import {ref, defineProps, defineEmits,watchEffect} from 'vue';
import swal from "sweetalert";
import {useReceiverrStore} from "@/stores/receiverStore";
import {debounce} from "lodash";
import {useTransactionStore} from "@/stores/transactionStore";
import {useHomeStore} from "@/stores/homeStore";
import Spinner from "@/components/Spinner.vue";


const receiverStore = useReceiverrStore();
const transactionStore = useTransactionStore();
const homeStore = useHomeStore();

const {senders, apiCall, bankList:banks = [],idList:identityList = [],transferTypeList,updateTransaction} = defineProps(([ 'senders',
  'apiCall',
  'bankList',
  'idList',
  'transferTypeList','updateTransaction']));

const emit = defineEmits<{
  (e: 'apiRequestedCompleted'): void
}>();


//default transaction values for update transaction
const {
  transactionId = "",
  receiverTitle = "",
  identity: receiverIdentityType = {},
  receiverId: receiverId = "",
  senderName: sName = "",
  receiverName: rName = "",
  receiverFname:rFname = "",
  receiverLname:rLname = "",
  receiverPhone: rPhone = "",
  receiverAccountNo: rAccountNo = "",
  receiverTransferType = "",
    bank:rBank = {},
    amountSent:amtSent = "",
    localAmount:lclAmount = "",
    totalAmount:tAmount = "",
    exchangeRate:rate = homeStore.exchangeRate,
    totalCommission = ""
} = transactionStore.activeTransaction



const canSend = ref(false)
const loadingReceiver = ref(false)
const receivers = ref([]);
const selectedSender = ref(rName);
const selectedReceiver = ref(sName);
const transactionData = ref();
const amountToSend = ref(amtSent);
const amountToCollect = ref(lclAmount);
const totalAmount = ref(tAmount);
const exchangeRate = ref(` £1 = ${rate}`);
const commission = ref(totalCommission)

const receiver = ref(receiverStore.activeReceiver)
const bankList = ref(banks.map(bank=>bank.name));
const idList = ref(identityList.map(bank=>bank.name));
const transferTypes = ref(transferTypeList);

const receiverFirstName = ref(rFname);
const receiverLastName = ref(rLname);
const receiverPhone = ref(rPhone);
const receiverAccountNumber = ref(rAccountNo);
const receiverTransferOption = ref(receiverTransferType);
const receiverBank = ref(rBank.name);
const newReceiverIdentityType = ref("");


//Actions Operation

const fetchReceivers = async (sender)=>{
  loadingReceiver.value = true;
  const receiversResponse = await receiverStore.fetchReceivers(0, sender.senderId);
  //console.log('senderId', sender.senderId)
  const list = receiverStore.receiverList;
  //console.log('list',list)
  receivers.value = list.receiver

  selectedSender.value = sender;

  loadingReceiver.value = false;
}

const onSelectReceiver = (receiver)=>{
  receiverFirstName.value = receiver.receiverFname;
  receiverLastName.value = receiver.receiverLname;
  receiverPhone.value = receiver.receiverPhone;
  receiverAccountNumber.value = receiver.accountNumber;
  receiverTransferOption.value = receiver.transferType;
  receiverBank.value = receiver.bank['name'];
  bankList.value = [receiver.bank['name']];
  transferTypes.value = [receiver.transferType];

  selectedReceiver.value = receiver

  
}

const onAmountChange =  debounce(async ( conversionType: number): Promise<void> => {
  let sendAmount = conversionType === 1?amountToSend.value : amountToCollect.value;
  try {
    const fetchUrl = await transactionStore.calculateSendAmount(sendAmount, conversionType);
    const calculationResponse = transactionStore.sendAmountCalculationResponse;

    if (calculationResponse) {
      amountToSend.value = calculationResponse.sendAmount;
      amountToCollect.value = calculationResponse.local;
      commission.value = calculationResponse.commissionValue;
      totalAmount.value = calculationResponse.totalAmount;
      exchangeRate.value = ` £1 = ${calculationResponse.rate}`;
      transactionData.value = calculationResponse;
    } else {
      console.error('Data is undefined.');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}, 500);


const submitTransaction = async ()=>{

  if(updateTransaction == 1
     &&
      receiverFirstName.value &&
      receiverLastName.value &&
      receiverPhone.value &&
      receiverAccountNumber.value  && receiverTransferOption.value
    ){
    const data = {
          transactionId:transactionId,
          receiverFirstName:receiverFirstName.value,
          receiverLastName: receiverLastName.value,
          receiverPhone: receiverPhone.value,
          receiverAccountNumber:receiverAccountNumber.value,
          receiverTransferOption: receiverTransferOption.value,
          receiverBankId:banks.find(bank=>bank.name==receiverBank.value)?.id || null,
          receiveridentity:idList.value.find(id=>id.name==receiverId.value)?.id || null,
    };
   const res = await  transactionStore.updateTransaction(data);
    transactionStore.toggleUpdateTransactionModal();
    swal("Update Sucessful", "Transaction Updated", "success");
  }

   if(!!selectedSender.value && !!selectedReceiver.value && !!transactionData.value){
    transactionStore.userTransactionData(selectedSender.value,selectedReceiver.value, transactionData.value)
     transactionStore.toggleAddTransactionModal();
     transactionStore.showSummaryPage = true
   }


}


watchEffect(() => {
  // Update the value of canSend based on the conditions
  canSend.value = (!!selectedReceiver.value && !!selectedSender.value && !!transactionData.value) || updateTransaction == 1;
});


const emptyInput = () => {

  newReceiver.value = "";
  newReceiverTitle.value = "";
  receiverFirstName.value = "";
  receiverLastName.value = "";
  newReceiverAddress.value = "";
  newReceiverIdentityType.value = "";

  return;
}


</script>
