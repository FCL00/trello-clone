// controllers/task.controller.ts
import type { Request, Response } from "express";
import { TaskService } from "@/service/taskService.js";
import { successResponse, errorResponse } from "@/utils/responseHandler.js";
export const getAllTask = async (req: Request, res: Response) => {
  try {
    const { boardId } = req.params;
    const tasks = await TaskService.findAll(boardId as string);
    return successResponse(res, "Successfully fetched tasks", tasks);
  } catch (error) {
    console.error(error);
    return errorResponse(res, (error as Error).message || "Internal server error", null, 500);
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id as string;
    const task = await TaskService.findById(taskId);

    if (!task) {
      return errorResponse(res, "Task not found", null, 404);
    }

    return successResponse(res, "Successfully fetched the task", task);
  } catch (error) {
    console.error(error);
    return errorResponse(res, (error as Error).message || "Internal server error", null, 500);
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string;
    const { boardId } = req.params;
    const validatedInput = req.body;

    const task = await TaskService.create({ userId, boardId, ...validatedInput });

    return successResponse(res, "Successfully created a task", task, 201);
  } catch (error) {
    return errorResponse(res, (error as Error).message || "Internal server error", null, 500);
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id as string;
    const userId = req.user?.id as string;

    const existingTask = await TaskService.findById(taskId);

    if (!existingTask || existingTask.userId !== userId) {
      return errorResponse(res, "Task not found or unauthorized", null, 404);
    }

    const updatedTask = await TaskService.update(taskId, req.body);
    return successResponse(res, "Task updated successfully", updatedTask);
  } catch (error) {
    return errorResponse(res, (error as Error).message || "Internal server error", null, 500);
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id as string;
    const userId = req.user?.id as string;

    const existingTask = await TaskService.findById(taskId);
    if (!existingTask || existingTask.userId !== userId) {
      return errorResponse(res, "Task not found or unauthorized", null, 404);
    }

    await TaskService.delete(taskId);
    return successResponse(res, "Task deleted successfully");
  } catch (error) {
    return errorResponse(res, (error as Error).message || "Internal server error", null, 500);
  }
};
