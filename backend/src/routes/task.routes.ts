import { Router } from "express";
import { getAllTask, getTaskById, createTask, updateTask, deleteTask } from "@/controllers/task.controller.js";
import requireAuth from "@/middleware/requireAuth.middleware.js";
import checkListRouter from "./checklist.routes.js";

const taskRouter = Router()

taskRouter.use(requireAuth)
taskRouter.get('/', getAllTask)
taskRouter.get('/:id', getTaskById)
taskRouter.post('/', createTask)
taskRouter.patch('/:id', updateTask)
taskRouter.delete('/:id', deleteTask)
taskRouter.use("/:taskId/checklists/", checkListRouter)

export default taskRouter