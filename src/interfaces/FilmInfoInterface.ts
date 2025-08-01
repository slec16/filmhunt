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

export type Person = Pick<IFilmDetail, "persons">["persons"][number]

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

export interface ISeasons {
    airDate: string,
    createdAt: string,
    enName: string,
    episodes: IEpisode[],
    episodesCount: number,
    id: string,
    movieId: number,
    name: string
    number: number,
    poster: {
        previewUrl: string,
        url: string
    },
    source: string,
    updatedAt: string
}

export interface IEpisode {
    airDate: string,
    description: string,
    enDescription: string,
    enName: string,
    name: string,
    number: number,
    still: {
        previewUrl: string,
        url: string
    }
}

export interface IFilmCard {
    id: number,
    name: string,
    poster: {
        url: string,
        previewUrl: string
    },
    shortDescription: string,
    ageRating: number,
    genres: {name: string}[],
    year: number, 
    rating: {
        imdb: number
    },
    countries: {name: string}[],
    movieLength: number
}

export interface IReview {
    id: number,
    movieId: number,
    title: string,
    type: string,
    review: string,
    date: string,
    author: string,
    userRating: number,
    authorId: number,
    reviewLikes: number,
    reviewDislikes: number,
    createdAt: string,
    updatedAt: string
}