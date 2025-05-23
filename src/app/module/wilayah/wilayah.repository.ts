import { Kysely } from "kysely";
import { DB, Wilayah } from "../../../db/db";

export class WilayahRepository {
    private readonly db: Kysely<DB>

    constructor(db: Kysely<DB>) {
        this.db = db;
    }

    async getAllProvinsi(): Promise<Wilayah[]> {
        const result = await this.db
            .selectFrom("wilayah")
            .selectAll()
            .where(this.db.fn('char_length', ['wilayah.kode']), '=', 2)
            .execute();

        return result;
    }

    async getKabupaten(provinceId: string): Promise<Wilayah[]> {
        const result = await this.db
            .selectFrom("wilayah")
            .selectAll()
            .where("wilayah.kode", "like", `${provinceId}%`)
            .where(this.db.fn('char_length', ['wilayah.kode']), '=', 5)
            .execute();

        return result;
       
    }

    async getKecamatan(regencyId: string): Promise<Wilayah[]> {

        console.log(`regencyId: ${regencyId}`)
         const result = await this.db
            .selectFrom("wilayah")
            .selectAll()
            .where("wilayah.kode", "like", `${regencyId}%`)
            .where(this.db.fn('char_length', ['wilayah.kode']), '=', 8)
            .execute();

        return result;
    }
}