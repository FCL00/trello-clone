<template>
  <header class="container flex-between">
    <router-link to="/"><h1>Taskly</h1></router-link>
    <router-link to="/sign-in">Sign In</router-link>
  </header>

  <section id="hero" class="hero gradient-background">
    <div class="container grid">
      <div class="flex">
        <h1>Taskly brings all your tasks, teammates, and tools together</h1>
        <p>keep everything in the same place-even if your team isn't.</p>
        <button>Get Started Here &rightarrow;</button>
      </div>
      <div>
        <el-image :src="hero" fit="cover" :lazy="true" />
      </div>
    </div>
  </section>

  <section id="feature" class="light-blue-gradient">
    <div class="container grid">
      <div class="flex">
        <h1>A productivity powerhouse</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur ex nemo quos molestiae ipsam nostrum qui
          reprehenderit eaque ipsa natus?
        </p>

        <div class="card">
          <h3>Boards</h3>
          <p>Trello boards keep tasks organized and work moving forward.</p>
        </div>
      </div>

      <div class="feature-image">
        <el-image :src="feature" fit="cover" :lazy="true" />
      </div>
    </div>
  </section>
  <base-footer/>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import hero from '@/assets/images/hero.png'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import feature from '@/assets/images/feature.png'
import BaseFooter from '@/components/BaseFooter.vue'

const authStore = useAuthStore()

onMounted(async () => {
  await authStore.initAuth()
})
</script>
