    import { Router } from "express"
    import { createItem, updateItem, deleteItem, getItems } from "@/controllers/checklist.controller.js"
    import requireAuth from '@/middleware/requireAuth.middleware.js'

    const checkListRouter = Router({ mergeParams: true})

    checkListRouter.use(requireAuth)
    checkListRouter.get('/', getItems)
    checkListRouter.post("/", createItem)
    checkListRouter.patch('/:itemId', updateItem)
    checkListRouter.delete('/:itemId', deleteItem)

    export default checkListRouter;