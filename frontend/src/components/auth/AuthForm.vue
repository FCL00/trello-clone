<template>
  <el-card shadow="never">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" @submit.prevent="submitForm(ruleFormRef)">
      <h1>{{ formLabel || 'Sign Up' }}</h1>
      <el-form-item v-if="props.mode === 'sign-up'" label="Name" label-position="top" prop="name" size="large">
        <el-input type="text" v-model="ruleForm.name" placeholder="Enter your name" size="large" clearable />
      </el-form-item>
      <el-form-item label="Email" label-position="top" prop="email" size="large">
        <el-input type="email" v-model="ruleForm.email" placeholder="Enter your email" size="large" clearable />
      </el-form-item>
      <el-form-item label="Password" label-position="top" prop="password" size="large">
        <el-input type="password" v-model="ruleForm.password" placeholder="Enter your password" size="large" show-password clearable />
      </el-form-item>
      <el-button native-type="submit" size="large">
        {{ props.confirmButtonText || 'Sign Up' }}
      </el-button>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

interface FormProps {
  formLabel?: string
  confirmButtonText?: string
  mode?: 'sign-in' | 'sign-up'
}

const props = defineProps<FormProps>()
const emit = defineEmits(["on-submit"])

interface RuleForm {
  name?: string
  email: string
  password: string
}

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: '',
  email: '',
  password: '',
})

const rules = reactive<FormRules<RuleForm>>({
  name: [{ required: true, message: 'Name is required', trigger: 'blur' }],
  email: [{ required: true, message: 'Email is required', trigger: 'blur' }],
  password: [{ required: true, message: 'Password is required', trigger: 'blur' }],
})


const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      emit("on-submit", {...ruleForm})
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>
