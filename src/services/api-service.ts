import { API_PATH } from "./constant"
import { HttpService } from "./http-service"


class ApiService extends HttpService {

    constructor() {
        super(API_PATH)
    }

    baseParams = 'movie?notNullFields=id&notNullFields=name&notNullFields=shortDescription&notNullFields=year&notNullFields=rating.imdb&notNullFields=ageRating&notNullFields=genres.name&notNullFields=poster.url'

    getFilmsByFilter(page: number, limit: number, paramsPath?: string, signal?: AbortSignal) {
        const path = this.baseParams + `&page=${page}&limit=${limit}` + paramsPath
        console.log(path)
        return this.get(path, signal)
    }

    getFilmsBySearch(path: string, signal?: AbortSignal) {
        return this.get(path, signal)
    }


    
}

export default new ApiService