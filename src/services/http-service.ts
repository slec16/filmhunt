type FetchOptions = {
    signal?: AbortSignal,
    timeoutMs?: number,
    retry?: number,
    retryDelayMs?: number
}

export class HttpClient {

    baseUrl = 'https://api.kinopoisk.dev/v1.4'
    token = import.meta.env.VITE_API_KEY

    // constructor(baseApiPath: string) {
    //     this.baseUrl = baseApiPath
    // }

    // https://api.kinopoisk.dev/v1.4/movie?page=1&limit=10&selectFields=&sortField=id&sortType=-1

    get baseHeaders() {
        return {
            'Content-Type': 'application/json',
            'X-Api-Key': `${this.token}`
        }
    }

    protected async get(path: string, signal?: AbortSignal) {

        try {
            const response = await fetch(`${this.baseUrl}/${path}`, {
                headers: this.baseHeaders,
                signal
            })

            return this._handleResponse(response)
        } catch (err: any) {
            if (err.name == 'AbortError') {
                console.log('Fetch users request was aborted')
                return
            }
        }

    }

    private async _handleResponse(response: any) {
        const parsedData = await response.json()

        if (response.ok) {
            return parsedData
        }
        throw parsedData
    }

    private async fetchWithTimeout(input: string, init: RequestInit, timeoutMs: number, externalSignal?: AbortSignal) {

        const controller = new AbortController()
        const id = setTimeout(() => controller.abort(new Error('timeout')), timeoutMs)

        // объединяем внешний сигнал и внутренний
        const signals = [controller.signal, externalSignal].filter(Boolean) as AbortSignal[]
        const abortController = new AbortController()
        const onAbort = () => abortController.abort()
        signals.forEach(s => s.addEventListener('abort', onAbort, { once: true }))

        try {
            const res = await fetch(input, { ...init, signal: abortController.signal })
            return res
        } finally {
            clearTimeout(id)
            signals.forEach(s => s.removeEventListener('abort', onAbort))
        }

    }

    private async withRetry(fn: () => Promise<Response>, retry = 0, delayMs = 300) {
        let attempt = 0
        while (true) {
            try {
                const res = await fn();
                if (!res.ok && [429, 500, 502, 503, 504].includes(res.status) && attempt < retry) {
                    attempt++
                    await new Promise(r => setTimeout(r, delayMs * Math.pow(2, attempt - 1)))
                    continue
                }
                return res
            } catch (e: any) {
                if (attempt < retry) {
                    attempt++
                    await new Promise(r => setTimeout(r, delayMs * Math.pow(2, attempt - 1)))
                    continue
                }
                throw e
            }
        }
    }

    async newGet(path: string, options: FetchOptions) {

        const { signal, timeoutMs = 10000, retry = 3, retryDelayMs = 300 } = options
        const doFetch = () =>
            this.fetchWithTimeout(`${this.baseUrl}/${path}`, {
                headers: this.baseHeaders,
                method: 'GET'
            }, timeoutMs, signal)
        const response = await this.withRetry(doFetch, retry, retryDelayMs)
        const data = await response.json()
        if (!response.ok) throw data
        return data

    }

}

type CacheEntry<T> = { data: T; ts: number }

export class MemoryCache {

    private store = new Map<string, CacheEntry<any>>()

    constructor(private cacheTimeMs: number, private staleTimeMs: number) { }

    get<T>(key: string): T | undefined {
        const entry = this.store.get(key)
        if (!entry) return
        const age = Date.now() - entry.ts
        // cacheTime — время жизни в памяти; staleTime — “свежесть”
        if (age > this.cacheTimeMs) { this.store.delete(key); return; }
        return entry.data as T;
    }

    set<T>(key: string, data: T) {
        this.store.set(key, { data, ts: Date.now() })
    }

    isStale(key: string) {
        const entry = this.store.get(key)
        if (!entry) return true
        return (Date.now() - entry.ts) > this.staleTimeMs
    }

    invalidate(prefix?: string) {
        if (!prefix) { this.store.clear(); return; }
        for (const k of this.store.keys()) {
            if (k.startsWith(prefix)) {
                this.store.delete(k)
            }
        }
    }

}