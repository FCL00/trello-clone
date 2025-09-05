import { defineStore } from "pinia"
import { fetchAllBoards, fetchById, createBoard } from "@/service/boardService"
import type { Board, Boards } from "@/types/Board"
import { ElMessage } from "element-plus"

export const useBoardStore = defineStore('board', {
  state: () => ({
    boards: [] as Boards[],
    loading: false,
    error: null as string | null
  }),

  actions: {
    async getAllBoards() {
      try {
        const res = await fetchAllBoards()
        if (res.success) {
          this.boards = res.data
          console.log(this.boards)
        } else {
          ElMessage.error(res.message)
        }
      } catch (error) {
        ElMessage.error((error as Error).message)
      }
    },

    async getBoardById(boardId: string){
      try {
        const res = await fetchById(boardId)
        if(res.success){

          return
        } else {
          ElMessage.error(res.message)
        }
      } catch(error){
        ElMessage.error((error as Error).message)
      }
    },

    async createBoard(board: Board){
      try {
          const res = await createBoard(board)

          if(res.success){
            this.boards.push(board)

          } else {
            ElMessage.error(res.message)
          }


      } catch(error){
         ElMessage.error((error as Error).message)
      }
    }
  }
})
