
import { Request, Response, Router } from "express";

import { wrapAsyncRoutes } from "../../../helper/async-handler";
import { successResponse } from "../../../helper/response";
import { WilayahUsecase } from "./wilayah.usecase";

export class WilayahRouter {
    private readonly router: Router;
    private readonly wilayahUsecase: WilayahUsecase;

    constructor(router: Router, wilayahUsecase: WilayahUsecase) {
        this.router = router;
        this.wilayahUsecase = wilayahUsecase
        this.setupRouter();
    }

    private setupRouter() {
        const newRouter = Router()
        wrapAsyncRoutes(newRouter);

        this.router.use("/wilayah", newRouter)
        newRouter.get("/provinsi", this.getAllProvinsi.bind(this))
        newRouter.get("/kabupaten/:provinceId", this.getKabupaten.bind(this))
        newRouter.get("/kecamatan/:regencyId", this.getKecamatan.bind(this))
    }

    private async getAllProvinsi(_: Request, res: Response) {
        const result = await this.wilayahUsecase.getAllProvinsi()
        successResponse(res, result, "Berhasil mendapatkan data provinsi")
    }

    private async getKabupaten(req: Request, res: Response) {
        const { provinceId } = req.params
        const result = await this.wilayahUsecase.getKabupaten(provinceId)
        successResponse(res, result, "Berhasil mendapatkan data kabupaten")
    }

    private async getKecamatan(req: Request, res: Response) {
        const { regencyId } = req.params
        const result = await this.wilayahUsecase.getKecamatan(regencyId)
        successResponse(res, result, "Berhasil mendapatkan data kecamatan")
    }
}