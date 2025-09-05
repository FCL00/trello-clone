<template>
  <BaseHeader />

  <main class="workspace">
    <header class="workspace-header">
      <h1>{{ workspaceName }}</h1>
    </header>

    <section class="boards">
      <router-link
        v-for="board in boardStore.boards"
        :key="board.id"
        :to="`/board/${board.id}`"
        class="board-tile"
      >
        <div class="board-content">
          <h2>{{ board.name }}</h2>
        </div>
      </router-link>

      <!-- Create new board tile -->
      <div class="board-tile new-board" @click="createBoard">
        <span>+ Create Board</span>
      </div>

    </section>
  </main>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import BaseHeader from '@/components/BaseHeader.vue'
import { useBoardStore } from '@/stores/boardStore'

const boardStore = useBoardStore()

const authStore = useAuthStore()
const workspaceName = ref("My Workspace")


onMounted(async () => {
  await authStore.initAuth()
  await boardStore.getAllBoards()
})

function createBoard() {
  // TODO: implement create board logic
  console.log("Creating a new board...")
}
</script>

<style scoped lang="scss">

</style>
