<template>
  <div class="container">
    <sign-in-form form-label="Sign In" confirm-button-text="Sign In" mode="sign-in" @on-submit="handleSignIn"/>
  </div>
</template>

<script lang="ts" setup>
import { AuthForm as SignInForm } from '@/components'
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore()
const router = useRouter()

interface FormData {
  email: string
  password: string
}

function handleSignIn(formData: FormData){
  const { email, password } = formData
  authStore.signIn(email, password)
  console.log(formData)
  router.push('/dashboard')
}

</script>
