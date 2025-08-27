<template>
  <router-view />
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router';
</script>

<style>

</style>

<!-- <template>
  <form @submit.prevent="handleSubmit">
    <input type="text" name="email" placeholder="email" v-model="email" autocomplete="off"/>
    <input type="text" name="name" placeholder="name" v-model="name" autocomplete="off"/>
    <input type="password" name="password" placeholder="password" v-model="password" autocomplete="off"/>
    <button type="submit">Submit</button>
  </form>


  <form @submit.prevent="handldeLogin">
    <input type="text" name="email" placeholder="email" v-model="email" autocomplete="off"/>
    <input type="password" name="password" placeholder="password" v-model="password" autocomplete="off"/>
    <button type="submit">Submit</button>
  </form>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

const authStore = useAuthStore()
const email = ref('')
const name = ref('')
const password = ref('')

function handleSubmit() {
  authStore.signUp(email.value, password.value, name.value)
}


function handldeLogin(){
  authStore.signIn(email.value, password.value)
}
</script>

<style scoped>
form {
  max-width: 500px;
  display: flex;
  flex-direction: column;
}

form > * {
  padding: 20px;
  margin-bottom: 20px;
}
</style> -->
