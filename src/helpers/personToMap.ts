const groupByProfession = (objectsArray: any) => {
    const professionMap = new Map();
    
    for (const obj of objectsArray) {
        if (obj && obj.profession !== undefined) {
            const profession = obj.profession;
            
            if (!professionMap.has(profession)) {
                professionMap.set(profession, []);
            }
            
            professionMap.get(profession).push(obj);
        }
    }
    
    return professionMap;
}

export default groupByProfession