<template>
  <el-dialog class="modal" :model-value="isOpen" @update:modelValue="onUpdate" width="1000">
    <template #header>
      <h1 v-if="!showTitle" @click="showTitle = true">{{ title }}</h1>
      <el-input v-else v-model="title" placeholder="Enter title here"  clearable @blur="hideTitleInput(task.id)" @key.enter="hideTitleInput(task.id)"  autocomplete="off"/>
    </template>
    <div class="grid">
      <div class="grid-row">
         <p>{{ task.status }}</p>
         <p>{{ task.description }}</p>
      </div>
      <div class="grid-row">
        <p>comments</p>
      </div>
    </div>

  </el-dialog>
</template>

<script lang="ts" setup>
import  { ref, watch } from "vue"
import type {  ChecklistItem } from "@/types/Task"

interface ModalProps {
  task:  ChecklistItem
  isOpen: boolean
}

const props = defineProps<ModalProps>()
const title = ref(props.task.title)
const showTitle = ref(false)

const emit = defineEmits(['update:isOpen'])

function onUpdate(){
  emit('update:isOpen', false)
}

function hideTitleInput(id: number | string){
  showTitle.value = false
  console.log(id )
}

watch(() => props.task.title, (newTitle) => {
  title.value = newTitle
})

</script>
