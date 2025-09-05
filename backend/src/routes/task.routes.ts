// routes/task.routes.ts
import { Router } from "express";
import { getAllTask, getTaskById, createTask, updateTask, deleteTask } from "@/controllers/task.controller.js";
import requireAuth from "@/middleware/requireAuth.middleware.js";
import checkListRouter from "./checklist.routes.js";

const taskRouter = Router({ mergeParams: true }); // 👈 so boardId from parent route is available

taskRouter.use(requireAuth);
taskRouter.get("/", getAllTask); // GET /boards/:boardId/tasks
taskRouter.get("/:id", getTaskById);
taskRouter.post("/", createTask);
taskRouter.patch("/:id", updateTask);
taskRouter.delete("/:id", deleteTask);

// Nested checklists
taskRouter.use("/:taskId/checklists", checkListRouter);

export default taskRouter;
