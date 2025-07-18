const mapToPath = (params: Map<string, string[]>) => {
    let parameterPath = ''
    params.forEach((value, key) => {

        if (key == 'Продолжительность') {
            value.forEach(el => {
                parameterPath+=`&${dictionary.get(key)}=${timeToMinutes.get(el)}`
            })
        } else if (key == 'Возрастной рейтинг') {
            value.forEach(el => {
                parameterPath+=`&${dictionary.get(key)}=${ageToRange.get(el)}`
            })
        } else {
            value.forEach((el) => {
                parameterPath+=`&${dictionary.get(key)}=${el}`
            })
        }     
    })
    return parameterPath
}

export default mapToPath

// TODO - типы жанров с маленькой буквы
const dictionary = new Map([
    ['Год выпуска', 'year'],
    ['Страна', 'countries.name'],
    ['Продолжительность', 'movieLength'],
    ['Жанры', 'genres.name'],
    ['Возрастной рейтинг', 'ageRating'],
    ['Рейтинг', 'rating.tmdb'],
    // ['Тип контента', '']
])

const timeToMinutes = new Map([
    ['<1ч', '0-59'],
    ['1-2ч', '60-119'],
    ['>2ч', '120-10000']
])


const ageToRange = new Map([
    ['0+', '0-5'],
    ['6+', '0-6'],
    ['12+', '0-12'],
    ['16+', '0-16'],
    ['18+', '0-18']
])