
import { ElMessage } from "element-plus";
import api from "./api";
import type { Response, Task, CheckList } from "@/types"
const BASE_URL = import.meta.env.VITE_BASE_URL

export const findAll = async (): Promise<Response<Task>> => {
  try {
    const res = await api.get<Response<Task>>(`${BASE_URL}/tasks`);
    return res.data;
  } catch (error) {
    ElMessage.error(error as Error)
    throw error
  }
}

export const createTask = async (data: Partial<Task>) : Promise<Response<Task>> => {
  try {
    const res = await api.post<Response<Task>>(`${BASE_URL}/tasks`, data)
    return res.data
  } catch (error){
    ElMessage.error(error as Error)
    throw error
  }
}


export const updateTaskById = async (taskId: string, data: Partial<Task>) : Promise<Response<Task>> => {
  try {
    const res = await api.patch<Response<Task>>(`${BASE_URL}/tasks/${taskId}`, data)
    return res.data
  } catch (error){
    ElMessage.error(error as Error)
    throw error
  }
}


export const deleteTaskById = async (taskId: string) : Promise<Response> => {
  try {
    const res = await api.delete(`${BASE_URL}/${taskId}`)
    return res.data
  } catch(error){
    ElMessage.error(error as Error)
    throw error
  }
}

export const addCheckListItem = async (taskId: string, data: Partial<CheckList>): Promise<Response<CheckList>> => {
  try {
    const res = await api.post(`${BASE_URL}/tasks/${taskId}/checklists`, data)
    return res.data
  } catch (error) {
    ElMessage.error(error as Error)
    throw error
  }
}

export const updateCheckListItem = async (taskId: string, id: string, data: Partial<CheckList>): Promise<Response<CheckList>> => {
  try {
    const res = await api.patch(`${BASE_URL}/tasks/${taskId}/checklists/${id}`, data)
    return res.data
  } catch(error){
    ElMessage.error(error as Error)
    throw error
  }
}

export const deleteCheckListItem = async (taskId: string, id: string): Promise<Response<CheckList>> => {
  try{
    const res = await api.delete(`${BASE_URL}/tasks/${taskId}/checklists/${id}`)
    return res.data
  } catch(error){
    ElMessage.error(error as Error)
    throw error
  }
}

