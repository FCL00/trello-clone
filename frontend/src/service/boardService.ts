import api from "./api";
import type { Response, Boards, Board } from "@/types";
const BASE_URL = import.meta.env.VITE_BASE_URL

export const fetchAllBoards = async (): Promise<Response<Boards[]>> => {
  try {
    const res = await api.get(`${BASE_URL}/boards`)
    return res.data
  } catch(error) {
    throw error
  }
}

export const fetchById = async (boardId: string): Promise<Response<Boards>> => {
  try {
    const res = await api.get(`${BASE_URL}/boards/${boardId}`)
    return res.data
  } catch(error) {
    throw error
  }
}


export const createBoard = async (board: Board): Promise<Response<Board>> => {
  try {
    const res = await api.post(`${BASE_URL}/boards`, board)
    return res.data
  } catch(error){
    throw error
  }
}



export const updateBoard = async (boardId: string, board: Board) : Promise<Response<Board>> =>{
  try {
    const res = await api.post(`${BASE_URL}/boards/${boardId}`, board)
    return res.data
  } catch(error){
    throw error
  }
}


export const deleteBoard = async(boardId: string) : Promise<Response<Board>> => {
  try {
    const res = await api.post(`${BASE_URL}/boards/${boardId}`)
    return res.data
  } catch(error){
    throw error
  }
}
