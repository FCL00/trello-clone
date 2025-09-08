<template>
  <el-dialog
    v-model="internalVisible"
    :title="title"
    :width="width"
    @close="handleClose"
  >
    <!-- Slot for custom content -->
    <slot />

    <!-- Default footer slot (can be overridden) -->
    <template #footer>
      <slot name="footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="handleSave">Save</el-button>
      </slot>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"

interface DialogProps {
  isDialogBoxOpen: boolean
  title?: string
  width?: string | number
}

const props = defineProps<DialogProps>()
const emit = defineEmits(["update:isDialogBoxOpen", "on-save", "on-close"])

const internalVisible = ref(props.isDialogBoxOpen)

watch(
  () => props.isDialogBoxOpen,
  (val) => {
    internalVisible.value = val
  }
)

watch(internalVisible, (val) => {
  emit("update:isDialogBoxOpen", val)
})

const handleSave = () => {
  emit("on-save")
}

const handleClose = () => {
  internalVisible.value = false
  emit("on-close")
}
</script>
