import { Router } from "express"
import requireAuth from "@/middleware/requireAuth.middleware.js"
import {
  getAllBoards,
  getSingleBoard,
  createBoard,
  updateBoard,
  deleteBoard,
  addBoardMember,
  removeBoardMember,
  listBoardMembers
} from "@/controllers/board.controller.js"
import taskRouter from "./task.routes.js"

const router = Router()

router.use(requireAuth)

router.get("/", getAllBoards)
router.get("/:id", getSingleBoard)
router.post("/", createBoard)
router.patch("/:id", updateBoard)
router.delete("/:id", deleteBoard)

// Members
router.get("/:id/members", listBoardMembers)
router.post("/:id/members", addBoardMember)
router.delete("/:id/members/:userId", removeBoardMember)

// tasks

router.use("/:boardId/tasks", taskRouter);
export default router
