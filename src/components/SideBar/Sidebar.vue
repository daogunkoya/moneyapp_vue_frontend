<script setup lang="ts">
import SideBarItem from './SideBarItem.vue'
import Calculator from "@/components/Calculator/Calculator.vue";
</script>

<template>
  <Calculator/>
    <div>
      <!-- Sidebar navigation -->
      <ul class="flex flex-col gap-6 p-3 mt-8 items-start">
        <SideBarItem icon = "house" link="/about">Transactions</SideBarItem>
        <SideBarItem icon = "piggy-bank" link="/about">Send Money</SideBarItem>
        <SideBarItem icon = "user" link="/about">New Sender</SideBarItem>
        <SideBarItem icon = "inbox" link="/about">New Receiver</SideBarItem>
        <SideBarItem icon = "house" link="/senders">Senders</SideBarItem>
        <SideBarItem icon = "chart-line" link="/about">Commissions</SideBarItem>
        <SideBarItem icon = "bug" link="/about">Outstanding</SideBarItem>
        <!-- Add more navigation SideBarItemnks as needed -->
      </ul>
    </div>
  </template>
  