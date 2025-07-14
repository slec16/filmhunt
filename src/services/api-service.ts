import { HttpService } from "./http-service"


class ApiService extends HttpService {

    constructor() {
        super('')
    }

    getFilms() {
        return this.testGet()
    }

    
}

export default new ApiService