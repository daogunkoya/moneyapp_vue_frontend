<template>
  <form @submit.prevent="makeApiRequest" class="flex flex-col items-center space-y-4">
    <select v-model="newReceiverTitle" class="border border-1 min-w-0 w-full p-2" required>
      <option v-for="(title,index) in titles" :key="index" :value="title">{{ title }}</option>
    </select>
    <input class="border border-1 focus:outline-none min-w-0 w-full p-2" type="text" v-model="newReceiverFirstName"
           placeholder="First Name"
           required/>
    <input class="border border-1 focus:outline-none min-w-0 w-full p-2" type="text" v-model="newReceiverLastName"
           placeholder="Last Name"
           required/>
    <input class="border focus:outline-none border-1 min-w-0 w-full p-2" type="tel" v-model="newReceiverPhoneNumber"
           placeholder="Phone Number" required/>
    <input class="border border-1 focus:outline-none min-w-0 w-full p-2" type="text" v-model="newReceiverAddress"
           placeholder="Address"
           required/>


    <label class="flex items-center min-w-0 w-full border border-1">
      <span class="w-1/5 text-gray-400">Transfer Type</span>
      <select v-model="newReceiverTransferType" class="border-none focus:outline-none min-w-0 w-full p-2" required>
        <option v-for="(transferType, index) in transferTypeList" :key="index"
                :value="transferType">
          {{ transferType }}
        </option>
      </select>
    </label>


    <label class="flex items-center min-w-0 w-full border border-1 ">
      <span class="w-1/5 text-gray-400">Bank</span>
      <select v-model="newReceiverBank" class="border-none focus:outline-none min-w-0 w-full p-2" required>
      <option  v-for="(bank, index) in receiverBanks" :key="index"
              :value="bank" >
        {{ bank }}
      </option>
    </select>

    </label>

    <input class="border border-1 focus:outline-none min-w-0 w-full p-2" type="text" v-model="newReceiverAccountNumber"
           placeholder="Account Number"
           required/>

    <label class="flex items-center min-w-0 w-full border border-1 ">
      <span class="w-1/5 text-gray-400">Identity Type</span>
      <select v-model="newReceiverIdentityType" class="border-none focus:outline-none min-w-0 w-full p-2" required>
        <option v-for="(identity, index) in proofOfIds" :key="index"
                :value="identity">
          {{ identity }}
        </option>
      </select>
    </label>

    <button class="bg-blue-300 p-3 rounded" type="submit">{{ !receiverId ? "Add Receiver" : "Update Receiver" }}</button>
  </form>

</template>

<script setup lang="ts">
import {ref, defineProps, defineEmits} from 'vue';
import swal from "sweetalert";
import {useReceiverrStore} from "@/stores/receiverStore";

const store = useReceiverrStore();

const {apiCall} = defineProps(([ 'apiCall']));
const emit = defineEmits<{
  (e: 'apiRequestedCompleted'): void
}>()

const {
  receiverTitle = "",
  receiverFname= "",
  receiverLname = "",
  receiverPhone= "",
  receiverAddress = "",
  transferType: receiverTransferType = {},
  identity: receiverIdentityType = {},
  bank:receiverBank = {},
  accountNumber:receiverAccountNumber = "",
  receiverId: receiverId = "",
  senderId:senderId = ""
} = store.activeReceiver

const receiver = ref(store.activeReceiver)
const apiBankList = store.bankList;
const apiIdList = store.identityTypeList;
const apiTransferTypeList = store.transferTypeList


const receiverBanks = ref(apiBankList.map(bank=>bank.name));
const proofOfIds = ref(apiIdList.map(id=>id.name));
const transferTypeList = ref(apiTransferTypeList);


const newReceiver = ref(receiver);
const newReceiverTitle = ref(receiverTitle);
const newReceiverFirstName = ref(receiverFname);
const newReceiverLastName = ref(receiverLname);
const newReceiverPhoneNumber = ref(receiverPhone);
const newReceiverAddress = ref(receiverAddress);
const newReceiverAccountNumber = ref(receiverAccountNumber);
const newReceiverTransferType = ref(receiverTransferType);
const newReceiverBank = ref(receiverBank.name);
const newReceiverIdentityType = ref(receiverIdentityType.name);


const titles = ['Mr', 'Mrs', 'Miss'];


const makeApiRequest = () => {
  // Perform actions to add a new receiver using all the provided fields
  const receiverData = {
    receiver_title: newReceiverTitle.value,
    receiver_fname: newReceiverFirstName.value,
    receiver_lname: newReceiverLastName.value,
    receiver_phone: newReceiverPhoneNumber.value,
    receiver_address: newReceiverAddress.value,
    transfer_type:newReceiverTransferType.value,
    identity_type_id:apiIdList.find(identity => identity.name === newReceiverIdentityType.value)?.id || null,
    bank_id:apiBankList.find(bank => bank.name === newReceiverBank.value)?.id || null,
    account_number:newReceiverAccountNumber.value,
    receiverId: receiverId,
  };

  console.log('data', receiverData);

  if (apiCall(receiverData)) {
    const message = !receiverId ? "New Sender Successfully Added" : "Successfully Updated"
    swal("Success!", message, "success");
    emit('apiRequestedCompleted');
    emptyInput();
  }
};

const emptyInput = () => {

  newReceiver.value = "";
  newReceiverTitle.value = "";
  newReceiverFirstName.value = "";
  newReceiverLastName.value = "";
  newReceiverPhoneNumber.value = "";
  newReceiverAccountNumber.value = "";
  newReceiverTransferType.value = "";
  newReceiverBank.value = "";
  newReceiverAddress.value = "";
  newReceiverIdentityType.value = "";

  return;
}


</script>
