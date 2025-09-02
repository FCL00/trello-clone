    import { Router } from "express"
    import { createItem, updateItem, deleteItem } from "@/controllers/checklist.controller.js"
    import requireAuth from '@/middleware/requireAuth.middleware.js'

    const checkListRouter = Router({ mergeParams: true})

    checkListRouter.use(requireAuth)
    checkListRouter.post("/", createItem)
    checkListRouter.patch('/:itemId', updateItem)
    checkListRouter.delete('/:itemId', deleteItem)

    export default checkListRouter;