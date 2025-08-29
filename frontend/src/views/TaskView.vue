<template>

  <section id="task" class="flex h-screen" @click="isAnotherListInputOpen = false">
    <!-- lists -->
    <draggable class="draggable" v-model="TaskList" group="tasks" item-key="id" @end="onDragEnd">
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
          <draggable v-model="element.checklist" group="checklist" item-key="id">
            <template #item="{ element: item }">
              <div class="draggable-item">
                <div class="flex-center ">
                  <el-checkbox
                     :model-value="item.status === 'completed'"
                     @change="onStatusChange(item)"
                  />

                  <p @click="viewCardDetails(item)">{{ item.title }}</p>
                </div>
                <button @click="handleDelete(element, item)">
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
          <el-button
            v-else
            color="black"
            class="font-bold"
            @click.stop="showInputs[element.id] = true"
          >
            + Add a card
          </el-button>
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

      <el-button v-else color="black" @click.stop="isAnotherListInputOpen = true">
        + Add another list
      </el-button>
    </div>

    <task-modal  v-if="selectedCheckListItem"  :task="selectedCheckListItem" v-model:isOpen="isTaskModalOpen" />
  </section>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import draggable from 'vuedraggable'
import type { ListItem, ChecklistItem} from "@/types/Task"
import { BaseModal as TaskModal } from '@/components'
import { ElMessage } from 'element-plus'

const isAnotherListInputOpen = ref(false)
const newListTitle = ref('')
const isTaskModalOpen = ref(false)
const selectedItem = ref<ListItem>()
const selectedCheckListItem = ref<ChecklistItem>()

const TaskList = ref<ListItem[]>([
  {
    id: 1,
    title: 'Today',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    checklist: [
      { id: 1, title: 'learn more', description: 'Lorem ipsum dolor sit amet.' , status: "ongoing"},
      { id: 2, title: 'load more', description: 'Consectetur adipisicing.' , status: "ongoing"},
    ],
  },
  {
    id: 2,
    title: 'This Week',
    description: 'Another list with its own tasks.',
    checklist: [
      { id: 3, title: 'setup project', description: 'Initialize repo and config.' , status: "completed"},
      { id: 4, title: 'install deps', description: 'Run npm install.' , status: "ongoing"},
    ],
  },
])

// local UI state
const newCardTitles = ref<Record<number, string>>({})
const showInputs = ref<Record<number, boolean>>({})
const showTitle = ref<Record<number, boolean>>({})

function onDragEnd(id: number) {
  console.log("i will update the data here :" + id)
}

function onStatusChange(item: ChecklistItem){
    item.status = item.status === 'completed' ? 'ongoing' : 'completed'
}

function editTitle(id: number, title: string) {
  if(!title) return
  showTitle.value[id] = true
}

function hideTitleInput(id: number, title: string) {
 if(!title) return
  showTitle.value[id] = false
}

function addList() {
  if(!newListTitle.value) return

  TaskList.value.push({
    id: Date.now(),
    title: newListTitle.value,
    description: 'random text',
    checklist: [],
  })

  newListTitle.value = ''
  isAnotherListInputOpen.value = false
}

function viewCardDetails(item: ChecklistItem) {
  if(!item) return ElMessage.error('No Selected Task...')
  isTaskModalOpen.value = true
  selectedCheckListItem.value = item
  console.log('view card details', selectedItem.value)
}

function addCard(list: ListItem) {
  const title = newCardTitles.value[list.id]
  if (!title) return

  list.checklist.push({
    id: Date.now(),
    title,
    description: 'New card',
    status: "ongoing"
  })

  newCardTitles.value[list.id] = ''
  showInputs.value[list.id] = false
}

function cancelAdd(list: ListItem) {
  newCardTitles.value[list.id] = ''
  showInputs.value[list.id] = false
}

function handleDelete(list: ListItem, item: ChecklistItem) {
  list.checklist = list.checklist.filter((currentItem) => currentItem.id !== item.id)

}

watch(TaskList, (newTaskList) => {
  console.log(newTaskList)
})

watch(
  TaskList,
  (newVal) => {
    console.log('TaskList changed:', newVal)
  },
  { deep: true },
)
</script>
