import type { Request, Response, NextFunction } from "express";
import { checkListService } from "@/service/checklistService.js";
import { TaskService } from "@/service/taskService.js";
import { successResponse, errorResponse } from "@/utils/responseHandler.js";


export const getItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { taskId } = req.params
    const userId = req.user?.id as string

    const task = await TaskService.findById(taskId as string)

    if (!task || task.userId !== userId) {
      return errorResponse(res, "Task not found or unauthorized", null, 404)
    }

    const items = await checkListService.findAllByTask(taskId as string)
    return successResponse(res, "Checklist items fetched successfully", items)
  } catch (error) {
    next(error)
  }
}

export const createItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskId = req.params.taskId as string;
    const validatedInput = req.body;
    const userId = req.user?.id as string;

    const task = await TaskService.findById(taskId)

    if (!task || task.userId !== userId) {
      return errorResponse(res, "Task not found or unauthorized", null, 404)
    }

    const newCheckListItem = await checkListService.create(taskId, validatedInput)
    return successResponse(res, "Checklist item created successfully", newCheckListItem)

  } catch (error) {
    next(error)
  }
}

export const updateItem = async (req: Request, res: Response, next: NextFunction ) => {
    try { 
        const { taskId, itemId } = req.params
        const validatedInput = req.body;
        const userId = req.user?.id as string;

        const task = await TaskService.findById(taskId as string)

        if(!task || task.userId !== userId ){
            return errorResponse(res, "Task not found or unauthorized", null, 404)
        }

        const updateCheckListItem = await checkListService.update(itemId as string, validatedInput)
        return successResponse(res, "Checklist item updated", updateCheckListItem);

    } catch(error) {
        next(error)
    }
}


export const deleteItem = async (req: Request, res: Response, next: NextFunction ) => {
    try { 
       const taskId = req.params.taskId as string
        const itemId = req.params.itemId as string
        const userId = req.user?.id;
        const task = await TaskService.findById(taskId as string)

        if(!task || task.userId !== userId ){
            return errorResponse(res, "Task not found or unauthorized", null, 404)
        }

        await checkListService.delete(taskId, itemId)
        return successResponse(res, "Checklist item deleted", null);
    } catch(error) {
        next(error)
    }
}