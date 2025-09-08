<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    @submit.prevent
  >
    <el-form-item label="Board Name" prop="name" label-position="top">
      <el-input
        v-model="ruleForm.name"
        placeholder="Enter board name"
        clearable
      />
    </el-form-item>

    <el-form-item label="Description" prop="description" label-position="top">
      <el-input
        v-model="ruleForm.description"
        placeholder="Enter description"
        clearable
      />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue"
import type { FormInstance, FormRules } from "element-plus"
import type { BoardInput } from "@/types"

// Props
interface Props {
  initialData?: BoardInput | null // ✅ clearer than modelValue
}

const props = defineProps<Props>()

// Form state
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<BoardInput>({
  name: "",
  description: ""
})

// Sync initialData -> form values
watch(
  () => props.initialData,
  (val) => {
    if (val) {
      Object.assign(ruleForm, val)
    } else {
      Object.assign(ruleForm, { name: "", description: "" }) // reset when null
    }
  },
  { immediate: true }
)

// Validation rules
const rules: FormRules<BoardInput> = {
  name: [{ required: true, message: "Board name is required", trigger: "blur" }],
  description: [{ required: true, message: "Description is required", trigger: "blur" }]
}

// Public methods
const resetForm = () => {
  ruleFormRef.value?.resetFields()
}

defineExpose({
  ruleFormRef,
  ruleForm,
  resetForm
})
</script>
