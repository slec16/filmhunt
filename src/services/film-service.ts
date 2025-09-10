import { HttpClient, MemoryCache } from "./http-service"

type FetchOptions = {
    signal?: AbortSignal,
    timeoutMs?: number,
    retry?: number,
    retryDelayMs?: number
}

const buildKey = (path: string) => `GET:${path}`

class FilmService {
    constructor(private http: HttpClient, private cache: MemoryCache) { }

    private baseParams = 'movie?notNullFields=id&notNullFields=name&notNullFields=shortDescription&notNullFields=year&notNullFields=rating.imdb&notNullFields=ageRating&notNullFields=genres.name&notNullFields=poster.url'


    async getFilmsByFilter(page: number, limit: number, paramsPath?: string, options?: FetchOptions) {

        const path = this.baseParams + `&page=${page}&limit=${limit}` + paramsPath
        const key = buildKey(path)

        const cached = this.cache.get<any>(key)
        // свежие данные сразу возвращаем; при желании можно фоном обновлять
        if (cached && !this.cache.isStale(key)) return cached;

        //@ts-ignore
        const data = await this.http.newGet(path, options)

        //TODO добавить нормализацию

        this.cache.set(key, data)
        return data

    }
}

export default new FilmService(new HttpClient, new MemoryCache(300000, 100000))