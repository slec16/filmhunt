import { HttpClient, MemoryCache } from "./http-service"

type FetchOptions = {
    signal: AbortSignal,
    timeoutMs?: number,
    retry?: number,
    retryDelayMs?: number
}

const buildKey = (path: string) => `GET:${path}`

class FilmService {
    constructor(private http: HttpClient, private cache: MemoryCache) { }

    private baseParams = 'movie?notNullFields=id&notNullFields=name&notNullFields=shortDescription&notNullFields=year&notNullFields=rating.imdb&notNullFields=ageRating&notNullFields=genres.name&notNullFields=poster.url'


    async getFilmsByFilter(page: number, limit: number, options: FetchOptions, paramsPath?: string) {

        const path = this.baseParams + `&page=${page}&limit=${limit}` + paramsPath
        const key = buildKey(path)

        const cached = this.cache.get<any>(key)
        // свежие данные сразу возвращаем,  можно фоном обновлять
        if (cached && !this.cache.isStale(key)) return cached

        const data = await this.http.get(path, options)

        //TODO добавить нормализацию

        this.cache.set(key, data)
        return data

    }

    async getFilmBySearch(page: number, limit: number, name: string, options: FetchOptions) {
        const path = `movie/search?page=${page}&limit=${limit}&query=${name}`
        const key = buildKey(path)
        const cached = this.cache.get<any>(key)

        if (cached && !this.cache.isStale(key)) return cached

        const data = await this.http.get(path, options)

        this.cache.set(key, data)
        return data

    }

    async getFilmById(id: string, options: FetchOptions) {
        const path = `movie/${id}`
        const key = buildKey(path)
        const cached = this.cache.get<any>(key)

        if (cached && !this.cache.isStale(key)) return cached

        const data = await this.http.get(path, options)

        this.cache.set(key, data)
        return data
    }

    async getSeasonsById(id: string, options: FetchOptions) {
        const path = `season?page=1&limit=10&movieId=${id}`
        const key = buildKey(path)
        const cached = this.cache.get<any>(key)

        if (cached && !this.cache.isStale(key)) return cached

        const data = await this.http.get(path, options)

        this.cache.set(key, data)
        return data
    }

    async getReviewByFilmId(id: string, page: string, limit: string, options: FetchOptions) {
        const path = `review?page=${page}&limit=${limit}&movieId=${id}`
        const key = buildKey(path)
        const cached = this.cache.get<any>(key)

        if (cached && !this.cache.isStale(key)) return cached

        const data = await this.http.get(path, options)

        this.cache.set(key, data)
        return data
    }

    async getRandomFilm(year: string, genres: string, countries: string, options: FetchOptions) {
        const path = `movie/random?notNullFields=name&notNullFields=shortDescription&year=${year}${genres}${countries}`
        const key = buildKey(path)
        const cached = this.cache.get<any>(key)

        if (cached && !this.cache.isStale(key)) return cached

        const data = await this.http.get(path, options)

        this.cache.set(key, data)
    }

    //TODO - invalidate, refresh

}

export default new FilmService(new HttpClient, new MemoryCache(300000, 100000))