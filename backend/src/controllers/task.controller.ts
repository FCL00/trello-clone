import type { Request, Response } from "express";
import { TaskService } from "@/service/taskService.js";

export const getAllTask = async (req: Request, res: Response) => {
  try {
    const task = await TaskService.findAll();
    if (task)
      return res.json({
        status: "rejected",
        message: "failed to fetch the task",
      });

    return res.json({
      status: "fulfilled",
      data: task || [],
      message: "Successfully fetch tasks",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "rejected",
      errors: (error as Error).message || "Internal server error",
    });
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
  const validateInput = req.body;

  try {
    const task = await TaskService.create(validateInput);
    if (task)
      return res.json({
        status: "rejected",
        message: "failed to create the task",
      });
    return res.json({
      status: "success",
      data: task,
      message: "Successfull created a task",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "rejected",
      errors: (error as Error).message || "Internal server error",
    });
  }
};
