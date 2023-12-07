

export default async ({ path, cache, cacheKey }) => {
  try {
    // console.log("[Servable]", `importJSDefault for path ${path}`)
    const data = (await import(path)).default
    // console.log("[Servable]", `importJSDefault for path ${path} successful`)
    return data
  } catch (e) {
    console.error("[Servable]", `importJSDefault for path ${path}:`, e)
  }
  return null
}
