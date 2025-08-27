<template>
  <div class="container flex-center  h-screen" @click="isAnotherListInputOpen = false">
    <draggable class="draggable" v-model="TaskList" group="tasks" item-key="id">
      <template #item="{ element }">
        <el-card shadow="never">
          <h3>{{ element.title }}</h3>
          <draggable v-model="element.checklist" group="checklist" item-key="id">
            <template #item="{ element: item }">
              <div class="draggable-item" @click="viewCardDetails">
                <p>{{ item.title }}</p>
                <button @click="handleDelete(element, item)">
                  <el-icon>
                    <Delete />
                  </el-icon>
                </button>
              </div>
            </template>
          </draggable>
          <div v-if="showInputs[element.id]" style="margin-bottom: 4px">
            <el-input
              v-model="newCardTitles[element.id]"
              placeholder="Enter a title"
              clearable
              @keyup.enter="addCard(element)"
              style="margin-bottom: 4px"
            />
            <div class="flex">
              <el-button color="black" size="small" @click="addCard(element)"> Add Card </el-button>
              <el-button color="black" size="small" @click="cancelAdd(element)"> Cancel </el-button>
            </div>
          </div>

          <!-- add card button -->
          <el-button v-else color="black" class="font-bold" @click="showInputs[element.id] = true">
            + Add a card
          </el-button>
        </el-card>
      </template>
    </draggable>

    <div class="">
      <el-input
        type="textarea"
        resize="none"
        :row="2"
        v-if="isAnotherListInputOpen"
        v-model="newListTitle"
        placeholder=""
        style="margin-bottom: 12px;"
        clearable
      />
      <el-button color="black" @click="isAnotherListInputOpen"> + Add another list</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import draggable from 'vuedraggable'

interface ChecklistItem {
  id: number
  title: string
  description: string
}

interface ListItem {
  id: number
  title: string
  description: string
  checklist: ChecklistItem[]
}

const isAnotherListInputOpen = ref(false)
const newListTitle = ref('')

const TaskList = ref<ListItem[]>([
  {
    id: 1,
    title: 'List 1',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    checklist: [
      { id: 1, title: 'learn more', description: 'Lorem ipsum dolor sit amet.' },
      { id: 2, title: 'load more', description: 'Consectetur adipisicing.' },
    ],
  },
  {
    id: 2,
    title: 'List 2',
    description: 'Another list with its own tasks.',
    checklist: [
      { id: 3, title: 'setup project', description: 'Initialize repo and config.' },
      { id: 4, title: 'install deps', description: 'Run npm install.' },
    ],
  },
])

// local UI state
const newCardTitles = ref<Record<number, string>>({})
const showInputs = ref<Record<number, boolean>>({})

function viewCardDetails() {
  console.log('view card details')
}



function addCard(list: ListItem) {
  const title = newCardTitles.value[list.id]
  if (!title) return

  list.checklist.push({
    id: Date.now(),
    title,
    description: 'New card',
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
