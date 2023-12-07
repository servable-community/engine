import extractProtocol from './extractProtocol/index.js'
import updateProtocolsExcerpt from './updateProtocolsExcerpt.js'
import proxyProtocolsLibrary from './proxyProtocolsPayloadLibrary.js'

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
