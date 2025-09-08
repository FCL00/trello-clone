<template>
  <header class="app-header">
    <div class="logo">
      <router-link to="/">
        <h1>Taskly</h1>
      </router-link>
    </div>

    <nav>
      <template v-if="authStore.user">
        <span class="user-name">Hi, {{ authStore.user.name }}</span>
        <el-button
          class="signout-btn"
          type="danger"
          size="large"
          @click="handleSignOut">
          Sign Out
        </el-button>
      </template>
      <template v-else>
        <router-link to="/sign-in">
          <el-button type="primary" size="large">Sign In</el-button>
        </router-link>
      </template>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

async function handleSignOut() {
  await authStore.signOut()
  router.push('/')
}
</script>

<style scoped lang="scss">
.app-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: #fff;
  padding: 1rem 2rem;
  border-bottom: 1px solid #eee;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    h1 {
      font-size: 1.6rem;
      font-weight: 700;
      margin: 0;
      color: #0065FF;
      letter-spacing: -0.5px;

      a {
        text-decoration: none;
        color: inherit;
      }
    }
  }

  nav {
    display: flex;
    align-items: center;
    gap: 1rem;

    .user-name {
      font-weight: 500;
      color: #333;
    }

    .signout-btn {
      border-radius: 6px;
    }
  }
}
</style>
