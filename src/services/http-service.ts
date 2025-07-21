export class HttpService {

    baseApi = ''
    token = import.meta.env.VITE_API_KEY

    constructor(baseApiPath: string){
        this.baseApi = baseApiPath
    }

    // https://api.kinopoisk.dev/v1.4/movie?page=1&limit=10&selectFields=&sortField=id&sortType=-1

    get baseHeaders() {
        return {
            'Content-Type': 'application/json',
            'X-Api-Key': `${this.token}`
        }
    }

    protected async get(path: string, signal?: AbortSignal){

        console.log(`${this.baseApi}/${path}`)
        try{
            const response = await fetch(`${this.baseApi}/${path}`, {
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

        if( response.ok ) {
            return parsedData
        }
        throw parsedData
    }
}