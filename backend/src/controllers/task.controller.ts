import type { Request, Response } from "express";
import { TaskService } from "@/service/taskService.js";
import type { Tasks } from "@/types/Task.js"
import { successResponse, errorResponse } from "@/utils/responseHandler.js";

export const getAllTask = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string
    const tasks = await TaskService.findAll(userId)
    return successResponse(res, "Successfully fetched tasks", tasks)
  } catch (error) {
    console.error(error)
    return errorResponse(res, (error as Error).message || "Internal server error", null, 500)
  }
};  

export const getTaskById = async (req: Request, res: Response) => {
  const taskId = req.params.id as string;

  try {
    const task = await TaskService.findById(taskId);
    if (task)
      return res.json({
        status: "rejected",
        message: "failed to fetch the task",
      });
    return res.json({
      status: "fulfilled",
      message: "Successfully fetch the task",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "rejected",
      errors: (error as Error).message || "Internal server error",
    });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string
    const validateInput = {userId: userId, ...req.body}
    const task = await TaskService.create(validateInput);
    if (!task)
      return res.json({
        status: "rejected",
        message: "failed to create the task",
      });
    return successResponse(res, "Successfully created a task", task, 201)
  } catch (error) {
     return res.status(500).json({
      success: false,
      message: (error as Error).message || "Internal server error",
      data: null,
      validationErrors: null,
    })
  }
};


export const updateTask = async (req: Request, res: Response ) => {
  try {
    
  } catch(error) {

  }
}

export const addCheckList = async (req: Request, res: Response ) => {
  try{

  } catch(error){
    
  }
}