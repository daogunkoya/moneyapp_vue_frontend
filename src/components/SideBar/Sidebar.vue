<script setup lang="ts">
import SideBarItem from './SideBarItem.vue'
import Calculator from "@/components/Calculator/Calculator.vue";

import { ref } from 'vue';

const isMouseOver = ref(false);

const sideBarHovered = ()=>{
  isMouseOver.value = !isMouseOver.value
}
</script>

<template>
  <div
      class="full-height bg-gray-200 flex flex-col gap-6 p-5  items-start">
    <Calculator/>
    <div>
      <!-- Sidebar navigation -->
      <ul class="">
        <SideBarItem icon = "house" link="/"  @sidebarHover="sideBarHovered"  :isMouseOver = "isMouseOver">Home</SideBarItem>
        <SideBarItem icon = "exchange" link="/transactions"  @sidebarHover="sideBarHovered"  :isMouseOver = "isMouseOver">Transactions</SideBarItem>
        <SideBarItem icon = "piggy-bank" link="/about"  @sidebarHover="sideBarHovered"   :isMouseOver="isMouseOver">Send Money</SideBarItem>
        <SideBarItem icon = "users" link="/senders"  @sidebarHover="sideBarHovered"  :isMouseOver = "isMouseOver">Senders</SideBarItem>
        <SideBarItem icon = "chart-line" link="/"  @sidebarHover="sideBarHovered"  :isMouseOver = "isMouseOver">Commissions</SideBarItem>
        <SideBarItem icon = "bug" link="/"  @sidebarHover="sideBarHovered"  :isMouseOver = "isMouseOver" >Outstanding</SideBarItem>
        <!-- Add more navigation SideBarItemnks as needed -->
      </ul>
    </div>
  </div>

  </template>




