// TODO switch - case
export const mapToPath = (params: Map<string, string[]>) => {
    let parameterPath = ''
    params.forEach((value, key) => {
        if (key == 'Продолжительность') {
            value.forEach(el => {
                parameterPath += `&${dictionary.get(key)}=${timeToMinutes.get(el)}`
            })
        } else if (key == 'Возрастной рейтинг') {
            value.forEach(el => {
                parameterPath += `&${dictionary.get(key)}=${ageToRange.get(el)}`
            })
        } else if (key == 'Год выпуска' && value[0] == 'До 1980') {
            parameterPath += `&${dictionary.get(key)}=1900-1980`
        } else if (key == 'Рейтинг') {
            parameterPath += `&${dictionary.get(key)}=${value[0]}-10`
        } else if (key == 'Жанры') {
            value.forEach((el) => {
                parameterPath += `&${dictionary.get(key)}=${el.toLocaleLowerCase()}`
            })
        } else if (key == "Тип контента") {
            value.forEach((el) => {
                parameterPath += `&${dictionary.get(key)}=${typeToPath.get(el)}`
            })
        } else {
            value.forEach((el) => {
                parameterPath += `&${dictionary.get(key)}=${el}`
            })
        }
    })
    return parameterPath
}

export const objToPath = (params: Record<string, string[]>) => {
    let parameterPath = ''

    Object.entries(params).forEach(([key, value]) => {
        if (key == 'Продолжительность') {
            value.forEach(el => {
                parameterPath += `&${objDictionary[key]}=${objTimeToMinutes[el]}`
            })
        } else if (key == 'Возрастной рейтинг') {
            value.forEach(el => {
                parameterPath += `&${objDictionary[key]}=${objAgeToRange[el]}`
            })
        } else if (key == 'Год выпуска' && value[0] == 'До 1980') {
            parameterPath += `&${objDictionary[key]}=1900-1980`
        } else if (key == 'Рейтинг') {
            parameterPath += `&${objDictionary[key]}=${value[0]}-10`
        } else if (key == 'Жанры') {
            value.forEach((el) => {
                parameterPath += `&${objDictionary[key]}=${el.toLocaleLowerCase()}`
            })
        } else if (key == "Тип контента") {
            value.forEach((el) => {
                parameterPath += `&${objDictionary[key]}=${objTypeToPath[el]}`
            })
        } else {
            value.forEach((el) => {
                parameterPath += `&${objDictionary[key]}=${el}`
            })
        }
    })

    return parameterPath
}

export const arrayToPath = (array: string[], params: string) => {
    let parameterPath = ''
    array.forEach((value) => {
        parameterPath += `&${params}=${value}`
    })
    return parameterPath
}

// TODO - типы жанров с маленькой буквы
const dictionary = new Map([
    ['Год выпуска', 'year'],
    ['Страна', 'countries.name'],
    ['Продолжительность', 'movieLength'],
    ['Жанры', 'genres.name'],
    ['Возрастной рейтинг', 'ageRating'],
    ['Рейтинг', 'rating.imdb'],
    ['Тип контента', 'type']
])

const objDictionary: Record<string, string> = {
    'Год выпуска': 'year',
    'Страна': 'countries.name',
    'Продолжительность': 'movieLength',
    'Жанры': 'genres.name',
    'Возрастной рейтинг': 'ageRating',
    'Рейтинг': 'rating.imdb',
    'Тип контента': 'type'
}


const timeToMinutes = new Map([
    ['<1ч', '0-59'],
    ['1-2ч', '60-119'],
    ['>2ч', '120-10000']
])

const objTimeToMinutes: Record<string, string> = {
    '<1ч': '0-59',
    '1-2ч': '60-119',
    '>2ч': '120-10000'
}


const ageToRange = new Map([
    ['0+', '5'],
    ['6+', '6'],
    ['12+', '12'],
    ['16+', '16'],
    ['18+', '18']
])

const objAgeToRange: Record<string, string> = {
    '0+':'5',
    '6+': '6',
    '12+': '12',
    '16+': '16',
    '18+': '18'
}

const typeToPath = new Map([
    ['Фильмы', 'movie'],
    ['Сериалы', 'tv-series'],
    ['Мультфильмы', 'cartoon'],
    ['Аниме', 'anime'],
])

const objTypeToPath: Record<string, string> = {
    'Фильмы': 'movie',
    'Сериалы': 'tv-series',
    'Мультфильмы': 'cartoon',
    'Аниме': 'anime'
}


// export default arrayToPath