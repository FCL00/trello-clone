// middleware
import type { Request, Response, NextFunction } from "express"
import { Prisma } from "@prisma/client";

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    try {

        let error = { ...err }
        error.message = err.message
        
        console.log(err)
        
        
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            switch (err.code) {
            case "P2002": // Unique constraint violation
                error.statusCode = 400;
                error.message = `Unique constraint failed on field: ${err.meta?.target}`
                break;
            case "P2025": // Record not found
                error.statusCode = 404;
                error.message = "Record not found"
                break;
            default:
                error.message = "Database error"
            }
        }

        if (err instanceof Prisma.PrismaClientValidationError) {
            error.statusCode = 400
            error.message = "Invalid data provided to database"
        }

        if (err.name === "ValidationError") {
            error.statusCode = 400
            error.message = err.message
        }


        res.status(error.statusCode || 500 ).json({ success: false, error: error.message || 'Server Error'})


    } catch(error){
        console.log("something went wrong")
    }
}

export default errorMiddleware


// import type { Request, Response, NextFunction } from "express"
// import { Prisma } from "@prisma/client";

// const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
//   try {
//     let error = { ...err }
//     error.message = err.message
//     error.statusCode = err.statusCode || 500

//     console.error(err)

//     if (err instanceof Prisma.PrismaClientKnownRequestError) {
//       switch (err.code) {
//         case "P2002": // Unique constraint violation
//           error.statusCode = 400
//           error.message = `Unique constraint failed on field: ${err.meta?.target}`
//           break
//         case "P2025": // Record not found
//           error.statusCode = 404
//           error.message = "Record not found"
//           break
//         default:
//           error.message = "Database error"
//       }
//     }

//     if (err instanceof Prisma.PrismaClientValidationError) {
//       error.statusCode = 400
//       error.message = "Invalid data provided to database"
//     }

//     if (err.name === "ValidationError") {
//       error.statusCode = 400
//       error.message = err.message
//     }

//     res.status(error.statusCode).json({
//       success: false,
//       message: error.message || "Server Error",
//       data: null,
//       validationErrors: err.validationErrors || null,
//     })
//   } catch (error) {
//     console.error("Something went wrong in errorMiddleware", error)
//     res.status(500).json({
//       success: false,
//       message: "Unexpected server error",
//       data: null,
//       validationErrors: null,
//     })
//   }
// }

// export default errorMiddleware
