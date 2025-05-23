import cors from "cors"
import dayjs from "dayjs"
import tz from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import express, { Application, Router } from "express"
import helmet from "helmet"
import morgan from "morgan"
import { db } from "../db/database"
import limitter from "../helper/limitter"
import { errorHandler } from "./middleware/errorHandler.middleware"
import { WilayahRepository } from "./module/wilayah/wilayah.repository"
import { WilayahRouter } from "./module/wilayah/wilayah.router"
import { WilayahUsecase } from "./module/wilayah/wilayah.usecase"

export class App {
    public app: Application

    constructor() {
        this.app = express()
        this.app.use(cors())
        this.app.use(morgan("dev"))
        this.app.use(helmet())
        this.app.use(limitter)

        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))

        this.setupRoute()
        this.app.use(errorHandler)

        dayjs.extend(utc)
        dayjs.extend(tz)
        dayjs.tz.setDefault("Asia/Jakarta")
    }

    private setupRoute(): void {
        this.app.get("/", (_, res) => {
            res.status(200).json({
                success: true,
                message: "Wilayah API Indonesia",
                version: "1.1.0",
            });
            return
        })

        const router = Router()
        this.app.use("/api", router)

        // Setup your routes here
        const wilayahRepository = new WilayahRepository(db)
        const wilayahUsecase = new WilayahUsecase(wilayahRepository)
        new WilayahRouter(router, wilayahUsecase)
    }
}