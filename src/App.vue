<script setup lang="ts">
// import { defineProps } from 'vue'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/SideBar/Sidebar.vue'

</script>

<template>
  <div class="flex flex-col min-h-screen">
    <!-- Navbar -->
    <Navbar />

    <div class="flex"> <!-- Adjusted class: flex-1 -->
      <!-- Left Sidebar -->
      <div class="w-1/5 bg-gray-200">
        <Sidebar />
      </div>

      <!-- Main Content -->
      <div class="w-4/5"> <!-- Adjusted class: flex-1 -->
        <RouterView />
      </div>
    </div>
  </div>
</template>