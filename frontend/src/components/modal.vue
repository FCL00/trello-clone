<template>
  <el-dialog v-model="">

  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";

interface ModalProps {
  id: number | string
  title: string
  description: string
  isOpen: boolean
}

const props = defineProps<ModalProps>()
</script>

<style>

</style>
