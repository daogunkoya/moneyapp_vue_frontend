<template>
  <div class="wrapper">
    <div class="">
      <h2 class="mb-6"> Login</h2>
      <form @submit.prevent="login" class=" flex flex-col gap-9">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" v-model="password" required>
        </div>
        <div class="flex">
          <label>
            <input type="checkbox" v-model="rememberMe">
            Remember me
          </label>
        </div>
        <button class="flex bg-blue-500 mb-5 text-white justify-center p-2 rounded-full" type="submit">Login</button>
      </form>
      <div class="forgotten-password">
        <a href="#">Forgotten Password?</a>
      </div>
    </div>
  </div>
</template>

<script setup>

import { useAuthStore } from '@/stores/piniaStore.ts'; // Import the Pinia store
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'; // Import router and route

const store = useAuthStore();
const email = ref('');
const password = ref('');
const route = useRoute(); // Use useRoute to get the current route
const router = useRouter(); // Use useRouter to get the router instance
const rememberMe = ref(store.rememberMe === true);

const login = async () => {
  const success = await store.login({email: email.value, password: password.value});

  if (success) {
    // Redirect to the previous route or a specific route
    localStorage.setItem('rememberMe', rememberMe.value ? 'true' : '');
    const redirectRoute = route.query.redirect || '/';
    router.push(redirectRoute);
  }

}

onMounted(() => {
  console.log('mounted')
  // Check if there's a valid token and "Remember Me" is checked
  if (store.isAuthenticated && rememberMe.value) {
   // router.push('/'); // Redirect to the home page
  }
});

</script>


<style scoped>

.wrapper{
  display: grid;
  place-items: center;
  margin:2rem auto;

}

.form-group{

  display: flex;
  flex-flow: column;
  min-width: 400px;
  justify-content: flex-start;
}

input{
  display: flex;
  flex:1;
  border-bottom: 1px solid #000000;
}

input:focus {
  outline: none;
}


</style>
