const mapToPath = (params: Map<string, string[]>) => {
    let parameterPath = ''
    params.forEach((value, key) => {

        if(key == 'Продолжительность') {
            value.forEach(el => {
                parameterPath+=`&${dictionary.get(key)}=${timeToMinutes.get(el)}`
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


const dictionary = new Map([
    ['Год выпуска', 'year'],
    ['Страна', 'countries.name'],
    ['Продолжительность', 'movieLength'],
    ['Жанры', 'genres.name'],
    ['Рейтинг', 'rating.tmdb']
    // ['Тип контента', '']
])

// TODO - в один временной диапазон года также
const timeToMinutes = new Map([
    ['<1ч', '0-59'],
    ['1-2ч', '60-119'],
    ['>2ч', '120-10000']
])