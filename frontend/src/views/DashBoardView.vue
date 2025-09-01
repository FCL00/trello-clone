<template>
  <div>
    <h1>Dashboard</h1>
    <h1>Welcome {{ authStore.user?.name }}</h1>
    <el-button size="large" @click="handleLogout">Logout</el-button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

async function handleLogout(){
  await authStore.signOut()
  router.push("/")
}

onMounted(async() => {

  await authStore.initAuth()
})

</script>

