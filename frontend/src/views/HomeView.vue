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
    <div class="container">
      <div style="max-width: 700px; padding: 32px 0px">
        <h1>A productivity powerhouse</h1>
        <p>
          Simple, flexible, and powerful. All it takes are boards, list, and cards to get a clear view of who's doing what and
          what needs to get done. Learn more in our <span>guide for getting started</span>
        </p>

       <div class="grid">
         <div class="card">
          <h3>Boards</h3>
          <p>
            Trello boards keep tasks organized and work moving forward. in a glance, see everything from “things to do” to “aww
            yeah, we did id!”
          </p>
        </div>
        <div class="">
          <el-image :src="feature" fit="cover" :lazy="true"/>
        </div>
       </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import hero from '@/assets/images/hero.png'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import feature from "@/assets/images/feature.png"

const authStore = useAuthStore()

onMounted(async () => {
  await authStore.initAuth()
})
</script>
