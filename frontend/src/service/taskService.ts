import api from "./api"
import type { Response } from "@/types"
import type { Task, CheckList } from "@/types"


const BASE_URL = import.meta.env.VITE_BASE_URL

export const fetchTasks = async (boardId: string): Promise<Response<Task[]>> => {
  const res = await api.get(`${BASE_URL}/boards/${boardId}/tasks`)
  return res.data
}
export const fetchTaskById = async (taskId: string): Promise<Response<Task>> => {
  const res = await api.get(`${BASE_URL}/tasks/${taskId}`)
  return res.data
}

export const createTask = async (boardId: string, task: Partial<Task>): Promise<Response<Task>> => {
  const res = await api.post(`${BASE_URL}/boards/${boardId}/tasks`, task)
  return res.data
}

export const updateTask = async (boardId: string, taskId: string, task: Partial<Task>): Promise<Response<Task>> => {
  const res = await api.patch(`${BASE_URL}/boards/${boardId}/tasks/${taskId}`, task)
  return res.data
}

export const deleteTask = async (taskId: string): Promise<Response<Task>> => {
  const res = await api.delete(`${BASE_URL}/tasks/${taskId}`)
  return res.data
}

export const addItemOnChecklist = async (
  boardId: string,
  taskId: string,
  payload: Partial<CheckList>
): Promise<Response<CheckList>> => {
  const res = await api.post(
    `${BASE_URL}/boards/${boardId}/tasks/${taskId}/checklists`,
    payload
  )
  return res.data
}

export const updateItemOnChecklist = async (
  boardId: string,
  taskId: string,
  itemId: string,
  payload: Partial<CheckList>
): Promise<Response<CheckList>> => {
  const res = await api.patch(
    `${BASE_URL}/boards/${boardId}/tasks/${taskId}/checklists/${itemId}`,
    payload
  )
  return res.data
}

export const deleteItemOnChecklist = async (
  boardId: string,
  taskId: string,
  itemId: string
): Promise<Response<CheckList>> => {
  const res = await api.delete(
    `${BASE_URL}/boards/${boardId}/tasks/${taskId}/checklists/${itemId}`
  )
  return res.data
}
