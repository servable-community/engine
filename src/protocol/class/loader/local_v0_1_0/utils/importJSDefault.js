

export default async ({ path, cache, cacheKey }) => {
    const data = (await import(path)).default
    return data
}