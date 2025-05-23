import { Wilayah } from "../../../db/db"
import { WilayahRepository } from "./wilayah.repository"

export class WilayahUsecase {
    private readonly wilayahRepository: WilayahRepository

    constructor(wilayahRepository: WilayahRepository) {
        this.wilayahRepository = wilayahRepository
    }

    async getAllProvinsi(): Promise<Wilayah[]> {
        const result = await this.wilayahRepository.getAllProvinsi()
        return result
    }

    async getKabupaten(provinceId: string): Promise<Wilayah[]> {
        const result = await this.wilayahRepository.getKabupaten(provinceId)
        return result
    }

    async getKecamatan(regencyId: string): Promise<Wilayah[]> {
        const result = await this.wilayahRepository.getKecamatan(regencyId)
        return result
    }
}
