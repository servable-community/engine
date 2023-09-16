import _ from 'underscore'
import Bluebird from "bluebird"

const perform = async (props) => {
    const {
        item,
        allProtocols,
        items,
        cache,
        operationName } = props

    const protocolId = _.isObject(item) ? item.id : item
    if (cache[protocolId] === 1 || cache[protocolId] === 2 || cache[protocolId] === 3) {
        return
    }

    const _module = _.findWhere(allProtocols, { id: protocolId })
    if (!_module) {
        return
    }

    const triggers = await _module.loader.triggers()
    if (!triggers) {
        return
    }
    const operation = triggers[operationName]
    if (!operation) {
        return
    }

    const metadata = await _module.loader.triggersMetadata()
    if (!metadata || !metadata.dependencies || !metadata.dependencies.length) {
        return doPerform({ ...props, operation, protocolId })
    }

    const { dependencies = [] } = metadata
    await Bluebird.Promise.mapSeries(
        dependencies,
        async dependency => {
            const { id } = dependency

            if (cache[id] === 1 || cache[id] === 2 || cache[id] === 3) {
                return
            }

            const candidates = items.filter(a => (a.id === id || a === id))
            if (!candidates || !candidates.length) {
                return
            }
            const candidate = candidates[0]
            await perform({
                ...props,
                item: candidate
            })
        })

    return doPerform({ ...props, operation, protocolId })
}

const doPerform = async (props) => {
    const { request, protocol, cache, operation, protocolId } = props
    try {
        cache[protocolId] = 1
        await operation({ request, protocol, })
        cache[protocolId] = 2
    } catch (e) {
        console.error(`Protocol > ${protocolId} > ${props.operationName}`, e.message)
        cache[protocolId] = 3
    }
}

export default perform