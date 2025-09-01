// utils/responseHandler.ts
/**
 * global responses for successful request
 * @param {any} res: any
 * @param {string} message string 
 * @param {any} data: any
 * @param {number} statusCode: number
 * @returns {any}
 */
export const successResponse = (res: any, message: string, data: any = null, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    validationErrors: null,
  })
}

/**
 * Description
 * @param {any} res any
 * @param {string} message string
 * @param {any} validationErrors any
 * @param {number} statusCode number
 * @returns {any}
 */
export const errorResponse = (res: any, message: string, validationErrors: any = null, statusCode = 400) => {
  return res.status(statusCode).json({
    success: false,
    message,
    data: null,
    validationErrors,
  })
}