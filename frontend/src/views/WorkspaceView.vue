<template>
  <BaseHeader />

  <main class="workspace">
    <header class="workspace-header">
      <h1>{{ workspaceName }}</h1>
    </header>

    <section class="boards">
      <div v-for="board in boardStore.boards" :key="board.id" class="board-wrapper">
        <router-link :to="`/tasks/${board.id}`" class="board-tile">
          <div class="board-content">
            <h2>{{ board.name }}</h2>
          </div>
        </router-link>

        <div class="board-actions">
          <el-button size="small" type="primary" @click="openEditBoard(board)">Edit</el-button>
          <el-button size="small" type="danger" @click="handleDeleteBoard(board.id)">
            <el-icon><Delete /></el-icon>
          </el-button>
        </div>
      </div>

      <!-- Create new board tile -->
      <div class="board-tile new-board" @click="isCreateDialogOpen = true">
        <span>+ Create Board</span>
      </div>
    </section>
  </main>

  <!-- Create Board Dialog -->
  <BaseDialog
    v-model:isDialogBoxOpen="isCreateDialogOpen"
    title="Create New Board"
    width="500px"
    @on-save="submitCreateBoard"
  >
    <BoardForm ref="boardFormRef" />
  </BaseDialog>

  <!-- Update Board Dialog -->
  <BaseDialog
    v-model:isDialogBoxOpen="isUpdateDialogOpen"
    title="Update Board"
    width="500px"
    @on-save="submitUpdateBoard"
  >
    <BoardForm ref="boardFormRef" :initialData="selectedBoard" />
  </BaseDialog>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"
import { useAuthStore } from "@/stores/auth"
import { useBoardStore } from "@/stores/boardStore"
import BaseHeader from "@/components/BaseHeader.vue"
import BaseDialog from "@/components/BaseDialog.vue"
import BoardForm from "@/components/board/BoardForm.vue"
import type { FormInstance } from "element-plus"
import type { Board } from "@/types"

const boardStore = useBoardStore()
const authStore = useAuthStore()

const workspaceName = ref("My Workspace")

// Dialog states
const isCreateDialogOpen = ref(false)
const isUpdateDialogOpen = ref(false)
const boardFormRef = ref<InstanceType<typeof BoardForm>>()

// Track selected board for editing
const selectedBoard = ref<Board | null>(null)

onMounted(async () => {
  await authStore.initAuth()
  await boardStore.getAllBoards()
})

async function handleDeleteBoard(boardId: string) {
  await boardStore.deleteBoard(boardId)
}

async function submitCreateBoard() {
  const form = boardFormRef.value
  if (!form) return
  const formEl: FormInstance | undefined = form.ruleFormRef
  if (!formEl) return

  await formEl.validate(async (valid) => {
    if (valid) {
      await boardStore.createBoard(form.ruleForm)
      isCreateDialogOpen.value = false
      form.resetForm()
    }
  })
}

async function submitUpdateBoard() {
  const form = boardFormRef.value
  if (!form || !selectedBoard.value) return
  const formEl: FormInstance | undefined = form.ruleFormRef
  if (!formEl) return

  await formEl.validate(async (valid) => {
    if (valid) {
      await boardStore.updateBoard(selectedBoard.value!.id, form.ruleForm)
      isUpdateDialogOpen.value = false
      form.resetForm()
    }
  })
}

function openEditBoard(board: Board) {
  selectedBoard.value = { ...board } // shallow copy so form edits don't affect original
  isUpdateDialogOpen.value = true
}
</script>

<style scoped lang="scss">
.workspace {
  padding: 1rem;
}

.boards {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.board-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.board-actions {
  display: flex;
  gap: 0.5rem;
}

.board-tile {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 6px;
  min-width: 200px;
}

.new-board {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  background: #f5f5f5;
  cursor: pointer;
}
</style>
