import { Router } from "express";
import { getAllTask, getTaskById, createTask } from "@/controllers/task.controller.js";
import requireAuth from "@/middleware/requireAuth.middleware.js";


const taskRouter = Router()

taskRouter.use(requireAuth)
taskRouter.get('/', getAllTask)
taskRouter.get('/:id', getTaskById)
taskRouter.post('/', createTask)
taskRouter.put('/', createTask)


export default taskRouter