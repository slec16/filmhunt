import { API_PATH } from "./constant"
import { HttpService } from "./http-service"


class ApiService extends HttpService {

    constructor() {
        super(API_PATH)
    }

    baseParams = 'movie?notNullFields=id&notNullFields=name&notNullFields=shortDescription&notNullFields=year&notNullFields=rating.imdb&notNullFields=ageRating&notNullFields=genres.name&notNullFields=poster.url'

    getFilmsByFilter(page: number, limit: number, paramsPath?: string, signal?: AbortSignal) {
        const path = this.baseParams + `&page=${page}&limit=${limit}` + paramsPath
        return this.get(path, signal)
    }

    getFilmsBySearch(path: string, signal?: AbortSignal) {
        return this.get(path, signal)
    }

    getFilmById(id: string, signal?: AbortSignal) {
        return this.get(`movie/${id}`, signal)
    }

    getSeasonsById(id: string, signal?: AbortSignal) {
        return this.get(`season?page=1&limit=10&movieId=${id}`, signal)
    }

    getReviewByFilmId(id: string, page: string, limit: string, signal?: AbortSignal) {
        return this.get(`review?page=${page}&limit=${limit}&movieId=${id}`, signal)
    }
    
}

export default new ApiService