import importJSONAsync from "../../../../../utils/importJSONAsync"

export default async ({ path, cache, cacheKey }) => {
    const data = await importJSONAsync(path)
    return data
}