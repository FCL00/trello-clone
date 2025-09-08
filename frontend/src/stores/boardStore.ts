import { defineStore } from 'pinia'
import { fetchAllBoards, fetchById, createBoard, deleteBoard, updateBoard } from '@/service/boardService'
import type { Board, Boards, BoardInput } from '@/types/Board'
import { ElMessage } from 'element-plus'

export const useBoardStore = defineStore('board', {
  state: () => ({
    boards: [] as Boards[],
    currentBoard: null as Boards | null,
    loading: false,
    error: null as string | null,
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

    async getBoardById(boardId: string) {
      try {
        const res = await fetchById(boardId)
        if (res.success) {
          this.currentBoard = res.data // ✅ store board (with tasks)
        } else {
          ElMessage.error(res.message)
        }
      } catch (error) {
        ElMessage.error((error as Error).message)
      }
    },

    async createBoard(board: Partial<Board>) {
      try {
        const res = await createBoard(board)
        if (res.success) {
          this.boards.push(res.data)
        } else {
          ElMessage.error(res.message)
        }
      } catch (error) {
        ElMessage.error((error as Error).message)
      }
    },

    async updateBoard(boardId: string, board: BoardInput) {
      try {
        const res = await updateBoard(boardId, board)

        if (res.success && res.data) {
          const index = this.boards.findIndex((board) => board.id === boardId)

          if (index === -1) {
            ElMessage.error('Board not found')
            return
          }
          this.boards[index] = res.data
          console.log(this.boards)
          ElMessage.success(res.message)
        } else {
          ElMessage.error(res.message || 'Update failed')
        }
      } catch (error) {
        ElMessage.error((error as Error).message)
      }
    },

    async deleteBoard(boardId: string) {
      try {
        const res = await deleteBoard(boardId)
        if (res.success) {
          this.boards = this.boards.filter((board) => board.id !== boardId)
          ElMessage.success(res.message)
        }
      } catch (error) {
        ElMessage.error(error as Error)
      }
    },

  },
})
