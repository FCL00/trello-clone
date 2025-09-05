import type { Request, Response, NextFunction } from "express"
import { successResponse, errorResponse } from "@/utils/responseHandler.js"
import { boardService } from "@/service/boardService.js"
import type { Board } from "@/types/Boards.js"

export const getAllBoards = async (req: Request, res: Response, next: NextFunction ) => {
    try {   
        const userId  = req.user?.id
        if(!userId)  return errorResponse(res, "Unauthorized", null, 401)
        const boards = await boardService.findAll(userId)
        return successResponse(res, "All boards are successfully fetch", boards )
     } catch(error){
        next(error)
    }
}

export const getSingleBoard = async (req: Request, res: Response, next: NextFunction ) => {
    try {
        const { id } = req.params 
        
        const board = await boardService.findById(id as string)
        return successResponse(res, "All boards are successfully fetch", board ) 
    } catch(error) {
        next(error)
    }
}

export const createBoard = async (req: Request, res: Response, next: NextFunction ) => {
    try {
        const userId = req.user?.id
        if(!userId) return errorResponse(res, "Unauthorized", null, 401)
        
        const validatedInput = req.body as Board
        const board = await boardService.create({...validatedInput, ownerId: userId})    
        return successResponse(res, 'Board Successfully created', board, 201)
    } catch(error){
        next(error)
    }
}

export const updateBoard = async(req: Request, res: Response, next: NextFunction ) => {
    try {
        const boardId = req.params.id as string
        const validatedInput = req.body as Board
        
        const board = await boardService.update(boardId, validatedInput)
        return successResponse(res, "Board is successfully updated", board)

    } catch(error){
        next(error)
    }
}

export const deleteBoard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    await boardService.delete(id as string)
    return successResponse(res, "Board is successfully updated", null)
  } catch (error) {
    next(error)
  }
}


export const addBoardMember = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: boardId } = req.params
    const { userId, role } = req.body

    if (!userId) {
      return errorResponse(res, "userId is required", null, 400)
    }

    const member = await boardService.addMember(boardId as string, userId, role)
    return successResponse(res, "board member is successfully added", member, 201)
  } catch (error) {
    next(error)
  }
}

// DELETE /boards/:id/members/:userId
export const removeBoardMember = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: boardId, userId } = req.params

    await boardService.removeMember(boardId as string, userId as string)
    return successResponse(res, "board member is successfully deleted", null, 204)
  } catch (error) {
    next(error)
  }
}

// GET /boards/:id/members
export const listBoardMembers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: boardId } = req.params
    const members = await boardService.listMembers(boardId as string)
    return successResponse(res, "successfully fetch the list of member")
  } catch (error) {
    next(error)
  }
}
