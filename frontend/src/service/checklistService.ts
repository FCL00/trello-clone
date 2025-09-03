import api from "./api"
import type { Response, CheckList } from "@/types"
import { ElMessage } from "element-plus"


const BASE_URL = import.meta.env.VITE_BASE_URL

export const addCheckListItem = async (taskId: string): Promise<Response<CheckList>>  => {
  try {
    const res = await api.post(`${BASE_URL}/${taskId}/checklists`)
    return res.data
  } catch(error){
    ElMessage.error(error as Error)
    throw error
  }
}
