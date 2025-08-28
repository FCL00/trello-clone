import { Router } from "express";
import { getAllTask, getTaskById, createTask } from "@/controllers/task.controller.js";

const taskRouter = Router()

taskRouter.get('/', getAllTask)
taskRouter.get('/:id', getTaskById)
taskRouter.post('/create', createTask)


export default taskRouter