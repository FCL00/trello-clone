import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import {
  fetchTasks,
  fetchTaskById,
  createTask,
  updateTask,
  deleteTask,
  addItemOnChecklist,
  updateItemOnChecklist,
  deleteItemOnChecklist,
} from '@/service/taskService'
import type { Task, CheckList } from '@/types'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [] as Task[],
    currentTask: null as Task | null,
  }),

  actions: {
    async fetchAllTask(boardId: string) {
      try {
        const res = await fetchTasks(boardId)
        if (res.success) {
          this.tasks = res.data
        } else {
          ElMessage.error(res.message)
        }
      } catch (err) {
        ElMessage.error((err as Error).message)
      }
    },

    async getTaskById(taskId: string) {
      try {
        const res = await fetchTaskById(taskId)
        if (res.success) {
          this.currentTask = res.data
        } else {
          ElMessage.error(res.message)
        }
      } catch (error) {
        ElMessage.error((error as Error).message)
      }
    },

    async createTask(boardId: string, task: Partial<Task>) {
      try {
        const res = await createTask(boardId, task)
        if (res.success) {
          this.tasks.push(res.data)
          ElMessage.success(res.message)
        } else {
          ElMessage.error(res.message)
        }
      } catch (error) {
        ElMessage.error((error as Error).message)
      }
    },

    async updateTask(boardId: string, taskId: string, task: Partial<Task>) {
      try {
        const res = await updateTask(boardId, taskId, task)
        if (res.success) {
          const index = this.tasks.findIndex((t) => t.id === taskId)
          if (index !== -1) this.tasks[index] = res.data
          ElMessage.success(res.message)
        } else {
          ElMessage.error(res.message)
        }
      } catch (error) {
        ElMessage.error((error as Error).message)
      }
    },

    async deleteTask(taskId: string) {
      try {
        const res = await deleteTask(taskId)
        if (res.success) {
          this.tasks = this.tasks.filter((t) => t.id !== taskId)
          ElMessage.success(res.message)
        } else {
          ElMessage.error(res.message)
        }
      } catch (error) {
        ElMessage.error((error as Error).message)
      }
    },

    async addItemOnChecklist(boardId: string, taskId: string, payload: Partial<CheckList>) {
      const res = await addItemOnChecklist(boardId, taskId, payload)
      if (res.success && res.data) {
        const task = this.tasks.find((t) => t.id === taskId)
        if (task) {
          task.checklistItem.push(res.data)
        }
        return res.data
      } else {
        ElMessage.error(res.message)
      }
    },

    async updateItemOnCheckList(boardId: string, taskId: string, itemId: string, payload: Partial<CheckList>) {
      const updatedItem = await updateItemOnChecklist(boardId, taskId, itemId, payload)
      const task = this.tasks.find((t) => t.id === taskId)
      if (task) {
        const idx = task.checklistItem.findIndex((i) => i.id === itemId)
        if (idx !== -1) task.checklistItem[idx] = { ...task.checklistItem[idx], ...updatedItem }
      }
    },

    async deleteItemOnCheckList(boardId: string, taskId: string, itemId: string) {
      await deleteItemOnChecklist(boardId, taskId, itemId)
      const task = this.tasks.find((t) => t.id === taskId)
      if (task) {
        task.checklistItem = task.checklistItem.filter((i) => i.id !== itemId)
      }
    },
  },
})
