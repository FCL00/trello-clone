import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors";

import errorMiddleware from "./middleware/error.middleware.js";
import requireAuth from "./middleware/requireAuth.middleware.js"

import authRouter from "./routes/auth.routes.js";

import { PORT } from "./config/env.js"



const app = express()

// CORS
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(cookieParser())


// Routes
app.use("/api/auth", authRouter)

app.use(errorMiddleware)

// PORT
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})


export default app;