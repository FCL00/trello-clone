<template>
  <div class="container">
    <sign-up-form mode="sign-up" @on-submit="signUp"/>
  </div>
</template>

<script lang="ts" setup>
import { AuthForm as SignUpForm } from "@/components"
import { useAuthStore } from "@/stores/auth"
import { useRouter } from "vue-router"


const router = useRouter()
interface formData {
  name: string
  email: string
  password: string
}

const authStore = useAuthStore()

async function signUp(formData: formData){
  const { name, email, password } = formData
  console.log(formData)
  await authStore.signUp( email, password, name)
  router.push("/sign-in")
}

</script>
