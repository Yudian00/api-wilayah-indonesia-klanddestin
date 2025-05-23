import { NextFunction, Request, Response } from "express";
// import {AppConfig} from "../../const/app-config";
import { v4 } from "uuid";
import { logErrorToDB } from "../../helper/error";
import logger from "../../helper/logger";

// Custom error interface
interface AppError extends Error {
    status?: number;
}

// Global error handler middleware
export const errorHandler = (err: AppError, req: Request, res: Response, __: NextFunction) => {
    // Default to 500 if no status is provided
    const generatedErrorId = v4()
    const statusCode = err.status || 500;
    const statusMessage = statusCode !== 500 ? err.message : "Internal Server Error"
    logErrorToDB(req, generatedErrorId, err.stack).then(() => logger.error("Error Created with ID : ", generatedErrorId))

    // Respond with JSON error message
    res.status(statusCode).json({
        success: false,
        message: statusMessage,
        errorId: generatedErrorId,
        stack: err.stack
    });
    
    return
};
