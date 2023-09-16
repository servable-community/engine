import _ from 'underscore'
import adaptProtocolPayload from '../../../../../../launch/utils/adaptProtocolPayload'
import cleanProtocols from '../../../../../../utils/cleanProtocols'


export default async ({
    classProtocols,
    protocolsPayloadLibrary }) => {

    const items = await Promise.all(classProtocols.map(async ({ id }) => {
        const protocol = await protocolsPayloadLibrary({ id })
        const ownProtocols = await protocol.loader.ownProtocols()
        return (ownProtocols && ownProtocols.length) ? ownProtocols.map(adaptProtocolPayload) : null
    }))

    const i = _.flatten(items.filter(a => a)).filter(a => a)
    return cleanProtocols(i)
}