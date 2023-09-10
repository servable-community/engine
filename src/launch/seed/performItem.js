import Bluebird from "bluebird"

const perform = async (props) => {
    const { item, items, cache, operationProps } = props
    const { file, metadata } = item
    if (cache[item.id]) {
        return
    }

    if (!metadata || !metadata.dependencies || !metadata.dependencies.length) {
        await file({ ...operationProps })
        cache[item.id] = true
        return
    }

    const { dependencies = [] } = metadata
    await Bluebird.Promise.mapSeries(
        dependencies,
        async dependency => {
            const { id } = dependency

            if (cache[id]) {
                return
            }

            const candidates = items.filter(a => a.id === id)
            if (!candidates || !candidates.length) {
                return
            }
            const candidate = candidates[0]
            await perform({
                ...props,
                item: candidate
            })
        })

    await file({ ...operationProps })
    cache[item.id] = true
}

export default perform