<template>
  <header class="container flex-between">
    <h1>Taskly</h1>
    <a>Login</a>
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
</template>

<script lang="ts" setup>
import hero from  "@/assets/images/hero.png";

</script>

<style></style>
