<template>
  <header class="flex-between">
    <div class="logo">
      <router-link to="/"><h1>Taskly</h1></router-link>
    </div>
    <nav>
      <el-dropdown>
        <el-button size="large">{{  authStore.user?.name }}</el-button>
         <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleSignOut">
                <span>Sign Out</span>
            </el-dropdown-item>
          </el-dropdown-menu>
         </template>
      </el-dropdown>
    </nav>

  </header>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'


const router = useRouter()
const authStore = useAuthStore()

async function handleSignOut(){
  await authStore.signOut()
  router.push('/')
}


</script>

<style scoped lang="scss">

</style>
