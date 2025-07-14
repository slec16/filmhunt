export class HttpService {

    baseApi = ''
    token = import.meta.env.VITE_API_KEY

    constructor(baseApiPath: string){
        this.baseApi = baseApiPath
    }

    get baseHeaders() {
        return {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${this.token}`,
            // 'credentials': 'include'
            'X-Api-Key': `${this.token}`
        };
    }

    // https://api.kinopoisk.dev/v1.4/movie?page=1&limit=10&selectFields=&sortField=id&sortType=-1
    async testGet() {
        console.log(this.baseHeaders)
        const response = await fetch('https://api.kinopoisk.dev/v1.4/movie?page=1&limit=10&selectFields=&sortField=id&sortType=-1', { headers: this.baseHeaders });
        console.log(response)
        return this._handleResponse(response);
    }

    protected async get(path: string, signal?: AbortSignal){

        try{
            const response = await fetch(`${this.baseApi}/${path}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
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