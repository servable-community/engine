import extractProtocol from './extractProtocol'
import updateProtocolsExcerpt from './updateProtocolsExcerpt'
import proxyProtocolsLibrary from './proxyProtocolsPayloadLibrary'

/**
* @description Generate schema for a given protocol.
*/
export default async (props) => {
  const { protocol, options } = props
  // const cache = {}
  const protocolsExcerpt = {}

  await protocol.load({ servableEngineConfig: options })

  const protocols = await extractProtocol({
    protocol,
    protocolsPayloadLibrary: async protocolPayload => proxyProtocolsLibrary({ ...props, protocolPayload }),
    // cache,
    updateProtocolsExcerpt: async _props => updateProtocolsExcerpt({ ..._props, protocolsExcerpt })
  })

  return {
    protocols,
    protocolsExcerpt
  }
}
