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
    shortDescription: string,
    logo: {
        url: string,
        previewUrl: string
    }

}

export interface IFilmDetail {
    ageRating: number,
    countries: {
        name: string
    }[],
    description: string
    genres: {
        name: string
    }[],
    id: number,
    isSeries: boolean
    logo: {
        url: string,
        previewUrl: string
    }
    movieLength: number | null
    name: string,
    persons: {
        description: string,
        enName: string,
        enProfession: string,
        id: number,
        name: string,
        photo: string,
        profession: string
    }[],
    poster: {
        previewUrl: string,
        url: string
    },
    rating: {
        imdb: number,
        kp: number
    },
    releaseYears: {
        end: number,
        start: number
    }[],
    seasonsInfo: {
        number: number,
        episodesCount: number
    }[],
    year: number
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