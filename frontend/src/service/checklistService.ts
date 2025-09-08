import axios from 'axios'
import type { Task, CheckList } from '@/types/Task'

const API_URL = '/api/tasks'

export const taskService = {
  async fetchAll(): Promise<Task[]> {
    const res = await axios.get(API_URL)
    return res.data.data
  },

  async addTask(payload: Partial<Task>): Promise<Task> {
    const res = await axios.post(API_URL, payload)
    return res.data.data
  },

  async updateTask(id: string, payload: Partial<Task>): Promise<Task> {
    const res = await axios.patch(`${API_URL}/${id}`, payload)
    return res.data.data
  },

  async deleteTask(id: string): Promise<void> {
    await axios.delete(`${API_URL}/${id}`)
  },

  async addItemOnChecklist(taskId: string, payload: Partial<CheckList>): Promise<CheckList> {
    const res = await axios.post(`${API_URL}/${taskId}/checklist`, payload)
    return res.data.data
  },

  async updateItemOnChecklist(taskId: string, itemId: string, payload: Partial<CheckList>): Promise<CheckList> {
    const res = await axios.patch(`${API_URL}/${taskId}/checklist/${itemId}`, payload)
    return res.data.data
  },

  async deleteItemOnChecklist(taskId: string, itemId: string): Promise<void> {
    await axios.delete(`${API_URL}/${taskId}/checklist/${itemId}`)
  },
}
