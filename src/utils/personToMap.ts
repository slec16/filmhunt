import { type Person } from "../interfaces"

const groupByProfession = (objectsArray: Person[]) => {
    const professionMap = new Map<string, Person[]>()
    
    for (const obj of objectsArray) {
        if (obj?.profession) {
            const profession = obj.profession
            const currentArray = professionMap.get(profession) ?? []
            professionMap.set(profession, [...currentArray, obj])
        }
    }
    
    return professionMap
}

export default groupByProfession