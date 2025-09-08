<template>
  <base-header />
  <section id="task" class="task-board" @click="isAnotherListInputOpen = false">
    <!-- lists -->
    <draggable
      class="lists"
      v-model="tasks"
      group="tasks"
      item-key="id"
      @end="onDragEnd"
      ghost-class="list-ghost"
      chosen-class="list-chosen"
      animation="300"
    >
      <template #item="{ element }">
        <el-card class="list" shadow="always">
          <!-- list title -->
          <div class="list-header">
            <el-input
              v-if="showTitle[element.id]"
              size="large"
              v-model="element.title"
              placeholder="Enter list title"
              clearable
              @blur="hideTitleInput(element.id, element.title)"
              @keyup.enter="hideTitleInput(element.id, element.title)"
            />
            <h3 v-else @click.stop="editTitle(element.id, element.title)">
              {{ element.title }}
            </h3>
            <button
              v-if="showTitle[element.id]"
              class="delete-btn"
              @click="hideTitleInput(element.id, element.title)"
            >
              <el-icon><Edit /></el-icon>
            </button>
          </div>

          <!-- checklist (cards inside list) -->
          <draggable
            v-model="element.checklistItem"
            group="checklist"
            item-key="id"
            :data-task-id="element.id"
            @change="(evt) => onDragChecklistChange(evt, element.id)"
            class="cards"
            ghost-class="card-ghost"
            chosen-class="card-chosen"
            animation="300"
          >
            <template #item="{ element: item }">
              <div class="card">
                <div class="card-content" @click="viewCardDetails(item)">
                  <el-checkbox
                    :model-value="item.status === 'completed'"
                    @change="onStatusChange(item)"
                  />
                  <p>{{ item.title }}</p>
                </div>
                <button class="delete-btn" @click="handleDeleteItem(element, item)">
                  <el-icon><Delete /></el-icon>
                </button>
              </div>
            </template>
          </draggable>

          <!-- add card input -->
          <div v-if="showInputs[element.id]" class="add-card-input" @click.stop>
            <el-input
              type="textarea"
              v-model="newCardTitles[element.id]"
              placeholder="Enter a title for this card"
              clearable
              size="large"
              @keyup.enter="addCard(element)"
            />
            <div class="actions">
              <el-button type="primary" @click="addCard(element)">Add Card</el-button>
              <el-button @click="cancelAdd(element)">Cancel</el-button>
            </div>
          </div>

          <!-- add card button -->
          <el-button
            v-else
            class="add-card-btn"
            @click.stop="showInputs[element.id] = true"
          >
            + Add a card
          </el-button>
        </el-card>
      </template>
    </draggable>

    <!-- add another list -->
    <div class="new-list">
      <div v-if="isAnotherListInputOpen" @click.stop>
        <el-input
          v-model="newListTitle"
          placeholder="Enter list title..."
          clearable
          class="new-list-input"
        />
        <div class="actions">
          <el-button type="primary" @click="addList">Add List</el-button>
          <el-button @click="isAnotherListInputOpen = false">Cancel</el-button>
        </div>
      </div>

      <el-button
        v-else
        class="add-list-btn"
        @click.stop="isAnotherListInputOpen = true"
      >
        + Add another list
      </el-button>
    </div>

    <task-modal
      v-if="selectedCheckListItem"
      :task="selectedCheckListItem"
      v-model:isOpen="isTaskModalOpen"
    />
  </section>
</template>


<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import draggable from 'vuedraggable'
import type { Task, CheckList } from '@/types/Task'
import { TaskModal } from '@/components'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useTaskStore } from '@/stores/taskStore'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import BaseHeader from '@/components/BaseHeader.vue';

const route = useRoute()
const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)
const isAnotherListInputOpen = ref(false)
const newListTitle = ref('')
const isTaskModalOpen = ref(false)
const selectedItem = ref<Task>()
const selectedCheckListItem = ref<CheckList>()

onMounted(async () => {
  const boardId = route.params.id as string
  await taskStore.fetchAllTask(boardId)
})

// local UI state
const newCardTitles = ref<Record<string, string>>({})
const showInputs = ref<Record<string, boolean>>({})
const showTitle = ref<Record<string, boolean>>({})

// uses floating strategy position
async function onDragEnd(evt) {
  const movedTask = tasks.value[evt.newIndex]

  const prevTask = tasks.value[evt.newIndex - 1] || null
  const nextTask = tasks.value[evt.newIndex + 1] || null

  let newPos: number

  if (prevTask && nextTask) {
    newPos = (prevTask.position + nextTask.position) / 2
  } else if (!prevTask && nextTask) {
    newPos = nextTask.position - 1 // move to top
  } else if (prevTask && !nextTask) {
    newPos = prevTask.position + 1 // move to bottom
  } else {
    newPos = 0
  }

  movedTask.position = newPos
  const boardId = route.params.id as string
  await taskStore.updateTask(boardId, movedTask.id, { position: newPos })
}

async function onDragChecklistChange(evt, targetTaskId: string) {
   const boardId = route.params.id as string
  // Case 1: Reorder within the same task
  if (evt.moved) {
    const task = tasks.value.find(t => t.id === targetTaskId)
    if (!task) return
    const checklist = task.checklistItem

    const { newIndex, element: movedItem } = evt.moved

    const prevItem = checklist[newIndex - 1] || null
    const nextItem = checklist[newIndex + 1] || null

    let newPos: number
    if (prevItem && nextItem) newPos = (prevItem.position + nextItem.position) / 2
    else if (!prevItem && nextItem) newPos = nextItem.position / 2
    else if (prevItem && !nextItem) newPos = prevItem.position + 65536
    else newPos = 65536

    movedItem.position = newPos
    await taskStore.updateItemOnCheckList(boardId, targetTaskId, movedItem.id, { position: newPos })
  }

  // Case 2: Moved from another task into this one
  if (evt.added) {
    const movedItem = evt.added.element
    const task = tasks.value.find(t => t.id === targetTaskId)
    if (!task) return
    const checklist = task.checklistItem

    const { newIndex } = evt.added
    const prevItem = checklist[newIndex - 1] || null
    const nextItem = checklist[newIndex + 1] || null

    let newPos: number
    if (prevItem && nextItem) newPos = (prevItem.position + nextItem.position) / 2
    else if (!prevItem && nextItem) newPos = nextItem.position / 2
    else if (prevItem && !nextItem) newPos = prevItem.position + 65536
    else newPos = 65536

    movedItem.position = newPos

    // update checklist item: new task + new position

    await taskStore.updateItemOnCheckList(boardId, targetTaskId, movedItem.id, {
      taskId: targetTaskId,
      position: newPos,
    })
  }
}




async function onStatusChange(item: CheckList) {
  const boardId = route.params.id as string
  const newStatus = item.status === 'completed' ? 'ongoing' : 'completed'
  item.status = newStatus

  await taskStore.updateItemOnCheckList(boardId, item.taskId, item.id, {
    status: newStatus,
  })
}

function editTitle(id: number, title: string) {
  if (!title) return
  showTitle.value[id] = true
}

async function hideTitleInput(id: string, title: string) {
  if (!title) return
  const boardId = route.params.id as string
  await taskStore.updateTask(boardId, id, { title })
  showTitle.value[id] = false
}


async function addList() {
  if (!newListTitle.value) return

  let newPos = 0
  if (tasks.value.length > 0) {
    const lastTask = tasks.value[tasks.value.length - 1]
    newPos = lastTask.position + 1
  }

  const boardId = route.params.id as string
  await taskStore.createTask(boardId, {
    title: newListTitle.value,
    position: newPos,
  })

  newListTitle.value = ''
  isAnotherListInputOpen.value = false
}


function viewCardDetails(item: CheckList) {
  if (!item) return ElMessage.error('No Selected Task...')
  isTaskModalOpen.value = true
  selectedCheckListItem.value = item
  console.log('view card details', selectedItem.value)
}

async function addCard(list: Task) {
  const boardId = route.params.id as string
  const title = newCardTitles.value[list.id]
  if (!title) return
  await taskStore.addItemOnChecklist(boardId, list.id, { title: title, description: '', status: 'ongoing' })
  newCardTitles.value[list.id] = ''
  showInputs.value[list.id] = false
}

function cancelAdd(list: Task) {
  newCardTitles.value[list.id] = ''
  showInputs.value[list.id] = false
}

function handleDeleteItem(task: Task, item: CheckList) {
  const boardId = route.params.id as string

  ElMessageBox.confirm(
    'Permanently delete the checklist item?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(async () => {
      await taskStore.deleteItemOnCheckList(boardId, task.id, item.id)
      task.checklistItem = task.checklistItem.filter(
        (currentItem) => currentItem.id !== item.id
      )
      ElMessage({
        type: 'success',
        message: 'Checklist item deleted',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}
watch(tasks, (newTaskList) => {
  console.log(newTaskList)
})

watch(
  tasks,
  (newVal) => {
    console.log('TaskList changed:', newVal)
  },
  { deep: true },
)
</script>
