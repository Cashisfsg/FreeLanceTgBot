export const getUniqueObjects = (arr: object[]) => {
    const mapObject = new WeakMap(arr.map(object => [object, object]));

    return Array.from(mapObject);
};
