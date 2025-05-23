import {NextFunction, Request, Response} from "express"
import logger from "./logger";

export async function uploadFile(_: Request, __: Response, next: NextFunction) {
    try {
        logger.info("Uploading file...")
        next()
    } catch (error) {
        next(error)
    }
}