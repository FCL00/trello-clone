<template>
  <section id="task" class="flex h-screen" @click="isAnotherListInputOpen = false">
    <!-- lists -->
    <draggable class="draggable" v-model="tasks" group="tasks" item-key="id" @end="onDragEnd">
      <template #item="{ element }">
        <el-card shadow="never">
          <div class="flex">
            <el-input
              v-if="showTitle[element.id]"
              size="large"
              v-model="element.title"
              placeholder="Enter Title"
              style="margin-bottom: 12px"
              clearable
              @blur="hideTitleInput(element.id, element.title)"
              @keyup.enter="hideTitleInput(element.id, element.title)"
            />
            <h3 v-else @click.stop="editTitle(element.id, element.title)">
              {{ element.title }}
            </h3>

            <button v-if="showTitle[element.id]" @click="hideTitleInput(element.id, element.title)">
              <el-icon><Delete /></el-icon>
            </button>
          </div>
          <!-- @end="onDragChecklistEnd" -->
          <draggable
            v-model="element.checklistItem"
            group="checklist"
            item-key="id"
            :data-task-id="element.id"
            @change="(evt) => onDragChecklistChange(evt, element.id)"
          >
            <template #item="{ element: item }">
              <div class="draggable-item">
                <div class="flex-center">
                  <el-checkbox :model-value="item.status === 'completed'" @change="onStatusChange(item)" />

                  <p @click="viewCardDetails(item)">{{ item.title }}</p>
                </div>
                <button @click="handleDeleteItem(element, item)">
                  <el-icon><Delete /></el-icon>
                </button>
              </div>
            </template>
          </draggable>

          <!-- add card input -->
          <div v-if="showInputs[element.id]" style="margin-bottom: 4px">
            <el-input
              v-model="newCardTitles[element.id]"
              placeholder="Enter a title"
              clearable
              size="large"
              @keyup.enter="addCard(element)"
              style="margin-bottom: 4px"
            />
            <div class="flex">
              <el-button color="#121212" @click="addCard(element)">Add Card</el-button>
              <el-button @click="cancelAdd(element)">Cancel</el-button>
            </div>
          </div>

          <!-- add card button -->
          <el-button v-else color="black" class="font-bold" @click.stop="showInputs[element.id] = true"> + Add a card </el-button>
        </el-card>
      </template>
    </draggable>

    <!-- add another list -->
    <div @click.stop>
      <el-input
        v-if="isAnotherListInputOpen"
        type="textarea"
        resize="none"
        :rows="3"
        v-model="newListTitle"
        placeholder="Enter list title..."
        style="width: 300px; margin-bottom: 12px"
        clearable
      />
      <div v-if="isAnotherListInputOpen" class="flex">
        <el-button color="black" @click="addList">Add List</el-button>
        <el-button type="info" @click="isAnotherListInputOpen = false">Cancel</el-button>
      </div>

      <el-button v-else color="black" @click.stop="isAnotherListInputOpen = true"> + Add another list </el-button>
    </div>

    <task-modal v-if="selectedCheckListItem" :task="selectedCheckListItem" v-model:isOpen="isTaskModalOpen" />
  </section>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import draggable from 'vuedraggable'
import type { Task, CheckList } from '@/types/Task'
import { TaskModal } from '@/components'
import { ElMessage } from 'element-plus'
import { useTaskStore } from '@/stores/taskStore'
import { storeToRefs } from 'pinia'

const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)
const isAnotherListInputOpen = ref(false)
const newListTitle = ref('')
const isTaskModalOpen = ref(false)
const selectedItem = ref<Task>()
const selectedCheckListItem = ref<CheckList>()

onMounted(async () => {
  await taskStore.fetchAllTask()
  console.log(taskStore.getAllTasks)
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
  await taskStore.updateTask(movedTask.id, { position: newPos })
}

async function onDragChecklistChange(evt, targetTaskId: string) {
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
    await taskStore.updateItemOnCheckList(targetTaskId, movedItem.id, { position: newPos })
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
    await taskStore.updateItemOnCheckList(targetTaskId, movedItem.id, {
      taskId: targetTaskId,
      position: newPos,
    })
  }
}




async function onStatusChange(item: CheckList) {
  const newStatus = item.status === 'completed' ? 'ongoing' : 'completed'
  item.status = newStatus

  await taskStore.updateItemOnCheckList(item.taskId, item.id, {
    status: newStatus,
  })
}

function editTitle(id: number, title: string) {
  if (!title) return
  showTitle.value[id] = true
}

async function hideTitleInput(id: string, title: string) {
  if (!title) return
  await taskStore.updateTask(id, { title: title })
  showTitle.value[id] = false
}

async function addList() {
  if (!newListTitle.value) return
  let newPos = 0
  if (tasks.value.length > 0) {
    const lastTask = tasks.value[tasks.value.length - 1]
    newPos = lastTask.position + 1
  }
  await taskStore.addTask({ title: newListTitle.value, position: newPos })
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
  const title = newCardTitles.value[list.id]
  if (!title) return
  await taskStore.addItemOnChecklist(list.id, { title: title, description: '', status: 'ongoing' })
  newCardTitles.value[list.id] = ''
  showInputs.value[list.id] = false
}

function cancelAdd(list: Task) {
  newCardTitles.value[list.id] = ''
  showInputs.value[list.id] = false
}

async function handleDeleteItem(task: Task, item: CheckList) {
  await taskStore.deleteItemOnCheckList(task.id, item.id)
  task.checklistItem = task.checklistItem.filter((currentItem) => currentItem.id !== item.id)
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
