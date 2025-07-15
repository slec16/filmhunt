import { API_PATH } from "./constant"
import { HttpService } from "./http-service"


class ApiService extends HttpService {

    constructor() {
        super(API_PATH)
    }

    getFilmsByFilter(path: string, signal?: AbortSignal) {
        return this.get(path, signal)
    }

    getFilmsBySearch(path: string, signal?: AbortSignal) {
        return this.get(path, signal)
    }


    
}

export default new ApiService