import { API_PATH } from "./constant"
import { HttpService } from "./http-service"


class ApiService extends HttpService {

    constructor() {
        super(API_PATH)
    }

    baseParams = 'movie?notNullFields=id&notNullFields=name&notNullFields=shortDescription&notNullFields=year&notNullFields=rating.imdb&notNullFields=ageRating&notNullFields=genres.name&notNullFields=poster.url'

    getFilmsByFilter(page: number, limit: number, token: string, paramsPath?: string, signal?: AbortSignal) {
        const path = this.baseParams + `&page=${page}&limit=${limit}` + paramsPath
        return this.get(path, token, signal)
    }

    getFilmsBySearch(name: string, page: number, limit: number, token: string, signal?: AbortSignal) {
        return this.get(`movie/search?page=${page}&limit=${limit}&query=${name}`, token, signal)
    }

    getFilmById(id: string, token: string, signal?: AbortSignal) {
        return this.get(`movie/${id}`, token, signal)
    }

    getSeasonsById(id: string, token: string, signal?: AbortSignal) {
        return this.get(`season?page=1&limit=10&movieId=${id}`, token, signal)
    }

    getReviewByFilmId(id: string, page: string, limit: string, token: string, signal?: AbortSignal) {
        return this.get(`review?page=${page}&limit=${limit}&movieId=${id}`, token, signal)
    }
    
}

export default new ApiService