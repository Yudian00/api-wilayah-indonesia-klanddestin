export enum HttpMessage {
    CREATE_SUCCESS = "Berhasil membuat data",
    UPDATE_SUCCESS = "Berhasil memperbarui data",
    DELETE_SUCCESS = "Berhasil menghapus data",
    GET_SUCCESS = "Berhasil mendapatkan data",
    INTERNAL_SERVER_ERROR = "Internal Server Error",
    VALIDATION_ERROR = "Validasi error",
}

export enum HttpError {
    INTERNAL_SERVER_ERROR = "Internal Server Error",
}