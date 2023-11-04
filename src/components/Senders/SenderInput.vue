<template>
  <form @submit.prevent="makeApiRequest" class="flex flex-col items-center space-y-4">
    <select v-model="newSenderTitle" class="border border-1 min-w-0 w-full p-2" required>
      <option v-for="(title,index) in titles" :key="index" :value="title">{{ title }}</option>
    </select>
    <input class="border border-1 min-w-0 w-full p-2" type="text" v-model="newSenderFirstName" placeholder="First Name"
           required/>
    <input class="border border-1 min-w-0 w-full p-2" type="text" v-model="newSenderMiddleName"
           placeholder="Middle Name" required/>
    <input class="border border-1 min-w-0 w-full p-2" type="text" v-model="newSenderLastName" placeholder="Last Name"
           required/>
    <input class="border border-1 min-w-0 w-full p-2" type="text" v-model="newSenderEmail" placeholder="Email"
           required/>
    <input class="border border-1 min-w-0 w-full p-2" type="date" v-model="newSenderDateOfBirth"
           placeholder="Date of Birth" required/>
    <input class="border border-1 min-w-0 w-full p-2" type="tel" v-model="newSenderPhoneNumber"
           placeholder="Phone Number" required/>
    <input class="border border-1 min-w-0 w-full p-2" type="tel" v-model="newSenderMobileNumber"
           placeholder="Mobile Number" required/>
    <input class="border border-1 min-w-0 w-full p-2" type="text" v-model="newSenderPostcode" placeholder="Postcode"
           required/>
    <input class="border border-1 min-w-0 w-full p-2" type="text" v-model="newSenderAddress" placeholder="Address"
           required/>
    <button class="bg-blue-300 p-3 rounded" type="submit">{{!senderId?"Add Sender": "Update Sender"}}</button>
  </form>

</template>

<script setup lang="ts">
import {ref, defineProps, defineEmits} from 'vue';
import swal from "sweetalert";

const {sender, apiCall} = defineProps((['sender', 'apiCall']));
const emit = defineEmits<{
  (e: 'apiRequestedCompleted'): void
}>()

const {
  sender_title: senderTitle = "",
  sender_fname: senderFname = "",
  sender_mname: senderMname = "",
  sender_lname: senderLname = "",
  sender_email: senderEmail = "",
  sender_dob: senderDob = "",
  sender_phone: senderPhone = "",
  sender_mobile: senderMobile = "",
  sender_postcode: senderPostcode = "",
  sender_address: senderAddress = "",
  sender_id: senderId = ""
} = sender



const newSenderTitle = ref(senderTitle);
const newSenderFirstName = ref(senderFname);
const newSenderMiddleName = ref(senderMname);
const newSenderLastName = ref(senderLname);
const newSenderEmail = ref(senderEmail);
const newSenderDateOfBirth = ref(senderDob);
const newSenderPhoneNumber = ref(senderPhone);
const newSenderMobileNumber = ref(senderMobile);
const newSenderPostcode = ref(senderPostcode);
const newSenderAddress = ref(senderAddress);



const titles = ['Mr', 'Mrs', 'Miss'];


const makeApiRequest = () => {
  // Perform actions to add a new sender using all the provided fields
  const newSenderData = {
    sender_title: newSenderTitle.value,
    sender_fname: newSenderFirstName.value,
    sender_mname: newSenderMiddleName.value,
    sender_lname: newSenderLastName.value,
    sender_email: newSenderEmail.value,
    sender_dob: newSenderDateOfBirth.value,
    sender_phone: newSenderPhoneNumber.value,
    sender_mobile: newSenderMobileNumber.value,
    sender_address: newSenderAddress.value,
    sender_postcode: newSenderPostcode.value,
    senderId:senderId,
  };

    if(apiCall(newSenderData)){
      const message = !senderId?"New Sender Successfully Added": "Successfully Updated"
      swal("Success!",message, "success");
      emit('apiRequestedCompleted');
      emptyInput();
    }
};

const emptyInput = () => {

  newSenderTitle.value = "";
  newSenderFirstName.value = "";
  newSenderMiddleName.value = "";
  newSenderLastName.value = "";
  newSenderEmail.value = "";
  newSenderDateOfBirth.value = "";
  newSenderPhoneNumber.value = "";
  newSenderMobileNumber.value = "";
  newSenderAddress.value = "";
  newSenderPostcode.value = "";

  return;
}


</script>
