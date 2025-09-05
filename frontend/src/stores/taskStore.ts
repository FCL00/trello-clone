import { defineStore } from 'pinia'
import { findAll, updateTaskById, createTask, deleteTaskById, addCheckListItem, deleteCheckListItem, updateCheckListItem } from '@/service/taskService'
import type { Task, CheckList } from '@/types'
import { ElMessage } from 'element-plus'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [] as Task[],
    loading: false as boolean,
    error: null as string | null,
  }),

  getters: {
    getAllTasks: (state) => state.tasks,
  },

  actions: {
    async fetchAllTask() {
      try {
        const response = await findAll()
        if (response.success) {
          this.tasks = response.data
        } else {
          this.error = response.message
          ElMessage.error(this.error)
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Unexpected error'
      } finally {
        this.loading = false
      }
    },

    async addTask(data: Partial<Task>) {
      try {
        const response = await createTask(data)
        if (response.success) {
          this.tasks.push(response.data)
        } else {
          this.error = response.message
          ElMessage.error(this.error)
        }
      } catch (error) {
        console.error(error)
        this.error = error instanceof Error ? error.message : 'Unexpected error'
        ElMessage.error(this.error)
      }
    },

    async updateTask(taskId: string, data: Partial<Task>) {
      try {
        const response = await updateTaskById(taskId, data)
        if (response.success) {
          const index = this.tasks.findIndex((t) => t.id === taskId)
          if (index !== -1) {
            this.tasks[index] = { ...this.tasks[index], ...response.data }
          }
        } else {
          this.error = response.message
          ElMessage.error(this.error)
        }
      } catch (error) {
        console.error(error)
        this.error = error instanceof Error ? error.message : 'Unexpected error'
        ElMessage.error(this.error)
      } finally {
        this.loading = false
      }
    },

    async deleteTask(taskId: string) {
      try {
        const response = await deleteTaskById(taskId)
        if (response.success) {
          this.tasks = this.tasks.filter((task) => task.id !== taskId)
          ElMessage.success('Successfully deleted a task')
        } else {
          this.error = response.message
          ElMessage.error(this.error)
        }
      } catch (error) {
        console.error(error)
        this.error = error instanceof Error ? error.message : 'Unexpected error'
        ElMessage.error(this.error)
      } finally {
        this.loading = false
      }
    },


    async addItemOnChecklist(taskId: string, item:  Partial<CheckList>){
      try {
        const response = await addCheckListItem(taskId, item)

        if(response.success) {
          const newItem = response.data
          const index = this.tasks.findIndex((task: Task) => task.id === taskId)
          if (index !== -1 && newItem) {
            this.tasks[index].checklistItem.push(newItem)
          }
        } else {
          this.error = response.message
          ElMessage.error(this.error)
        }

      } catch(error){
        console.error(error)
        this.error = error instanceof Error ? error.message : 'Unexpected error'
        ElMessage.error(this.error)
      }
    },

   async updateItemOnCheckList(taskId: string, itemId: string, item: Partial<CheckList>) {
      try {
        const response = await updateCheckListItem(taskId, itemId, item);

        if (!response.success) return;

        const taskIndex = this.tasks.findIndex(task => task.id === taskId);
        if (taskIndex === -1) return;

        const updatedItem: CheckList = response.data;
        const checklist = this.tasks[taskIndex].checklistItem;

        if (!Array.isArray(checklist)) return;

        const itemIndex = checklist.findIndex(checkItem => checkItem.id === itemId);
        if (itemIndex === -1) return;

        this.tasks[taskIndex].checklistItem[itemIndex] = updatedItem;
      } catch (error) {
        console.error(error);
        this.error = error instanceof Error ? error.message : "Unexpected error";
        ElMessage.error(this.error);
      }
    },

    async deleteItemOnCheckList(taskId: string, itemId: string){
      try{
        const response = await deleteCheckListItem(taskId, itemId)
        if(response.success){
          const index = this.tasks.findIndex((task) => task.id === taskId)
          if (index !== -1) {
            this.tasks[index].checklistItem.filter(item => item.id !== itemId)
          }
        } else {
          this.error = response.message
          ElMessage.error(this.error)
        }

      } catch(error){
        console.error(error)
      }
    }

  },
})
