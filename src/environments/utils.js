export function convertDataObjToArray(obj, idOverride = "id") {
    return Object.keys(obj).map(key => ({ [idOverride]: key, ...obj[key] }))
}

export function createGroups(arr, numGroups) {
    const perGroup = Math.ceil(arr.length / numGroups);
    return new Array(numGroups)
        .fill('')
        .map((_, i) => arr.slice(i * perGroup, (i + 1) * perGroup));
}

export function getTime() {
    return Math.floor(new Date() / 1000);
}