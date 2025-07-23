export interface IFilmInfo {
    ageRating: number,
    backdrop: {
        url: string,
        previewUrl: string
    },
    countries: {
        name: string
    }[],
    genres: {
        name: string
    }[],
    name: string,
    rating: {
        imdb: number,
        kp: number
    },
    year: number,
    shortDescription: string

}

export interface ISimilarMovies {
    id: number,
    name: string,
    poster: {
        url: string,
        previewUrl: string,
    },
    rating: {
        imdb: number,
        kp: number
    },
    year: number,
    type: string
}