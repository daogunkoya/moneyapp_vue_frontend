<template>
  <form @submit.prevent="makeApiRequest" class="flex flex-col items-center space-y-4">
    <select v-model="newReceiverTitle" class="border border-1 min-w-0 w-full p-2" required>
      <option v-for="(title,index) in titles" :key="index" :value="title">{{ title }}</option>
    </select>
    <input class="border border-1 focus:outline-none min-w-0 w-full p-2" type="text" v-model="receiverFirstName"
           placeholder="First Name"
           required/>
    <input class="border border-1 focus:outline-none min-w-0 w-full p-2" type="text" v-model="receiverLastName"
           placeholder="Last Name"
           required/>
    <input class="border focus:outline-none border-1 min-w-0 w-full p-2" type="tel" v-model="receiverPhoneNumber"
           placeholder="Phone Number" required/>
    <input class="border border-1 focus:outline-none min-w-0 w-full p-2" type="text" v-model="receiverAddress"
           placeholder="Address"
           required/>


    <label class="flex items-center min-w-0 w-full border border-1">
      <span class="w-1/5 text-gray-400">Transfer Type</span>
      <select v-model="newReceiverTransferType" class="border-none focus:outline-none min-w-0 w-full p-2" required>
        <option v-for="({value: transferTypeValue, key: transferTypeKey}, index) in newReceiverTransferType" :key="index"
                :value="transferTypeKey">
          {{ transferTypeValue }}
        </option>
      </select>
    </label>


    <label class="flex items-center min-w-0 w-full border border-1 ">
      <span class="w-1/5 text-gray-400">Bank</span>
      <select v-model="newReceiverBank" class="border-none focus:outline-none min-w-0 w-full p-2" required>
        <option v-for="({value: transferTypeValue, key: transferTypeKey}, index) in receiverBanks" :key="index"
                :value="transferTypeKey">
          {{ transferTypeValue }}
        </option>
      </select>
    </label>

    <input class="border border-1 focus:outline-none min-w-0 w-full p-2" type="text" v-model="receiverBank"
           placeholder="Account Number"
           required/>

    <label class="flex items-center min-w-0 w-full border border-1 ">
      <span class="w-1/5 text-gray-400">Identity Type</span>
      <select v-model="identityType" class="border-none focus:outline-none min-w-0 w-full p-2" required>
        <option v-for="({value: transferTypeValue, key: transferTypeKey}, index) in transferTypes" :key="index"
                :value="transferTypeKey">
          {{ transferTypeValue }}
        </option>
      </select>
    </label>

    <button class="bg-blue-300 p-3 rounded" type="submit">{{ !receiverId ? "Add Sender" : "Update Sender" }}</button>
  </form>

</template>

<script setup lang="ts">
import {ref, defineProps, defineEmits} from 'vue';
import swal from "sweetalert";

const {receiver, apiCall} = defineProps((['receiver', 'apiCall']));
const emit = defineEmits<{
  (e: 'apiRequestedCompleted'): void
}>()

const {
  receiver_title: receiver = "",
  receiver_fname: receiverFname = "",
  receiver_lname: receiverLname = "",
  receiver_phone: receiverPhone = "",
  receiver_address: receiverAddress = "",
  transfer_type: transferType = {transferTypeKey: "", transferTypeValue: ""},
  identity_type: identityType = {identityTypeKey: "", identityTypeValue: ""},
  bank = {BankKey: "", BankValue: ""},
  receiver_id: receiverId = ""
} = receiver


const newReceiver = ref(receiver);
const newReceiverFirstName = ref(receiverFname);
const newReceiverLastName = ref(receiverLname);
const newReceiverPhoneNumber = ref(receiverPhone);
const newReceiverAddress = ref(receiverAddress);n
const newReceiverTransferType = ref({});
const receiverBanks = ref({});


const titles = ['Mr', 'Mrs', 'Miss'];


const makeApiRequest = () => {
  // Perform actions to add a new receiver using all the provided fields
  const receiverData = {
    receiver_title: newReceiver.value,
    receiver_fname: receiverFirstName.value,
    receiver_lname: receiverLastName.value,
    receiver_phone: receiverPhoneNumber.value,
    receiver_address: newReceiverAddress.value,
    receiverId: receiverId,
  };

  if (apiCall(receiverData)) {
    const message = !receiverId ? "New Sender Successfully Added" : "Successfully Updated"
    swal("Success!", message, "success");
    emit('apiRequestedCompleted');
    emptyInput();
  }
};

const emptyInput = () => {

  newReceiver.value = "";
  receiverFirstName.value = "";
  receiverMiddleName.value = "";
  receiverLastName.value = "";
  receiverEmail.value = "";
  receiverDateOfBirth.value = "";
  receiverPhoneNumber.value = "";
  receiverMobileNumber.value = "";
  receiverAddress.value = "";
  receiverPostcode.value = "";

  return;
}


</script>
