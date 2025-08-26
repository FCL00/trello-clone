import { Router } from "express";
import { signIn, signUp, signOut, refresh, getMe } from "@/controllers/auth.controller.js";
import requireAuth from "@/middleware/requireAuth.middleware.js";
const authRouter = Router()


authRouter.post('/sign-up', signUp)
authRouter.post('/sign-in', signIn)
authRouter.post("/refresh", refresh)
authRouter.post('/sign-out', signOut)
authRouter.get('/me', requireAuth, getMe)


export default authRouter;