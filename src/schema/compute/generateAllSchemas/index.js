import extractProtocol from './extractProtocol'
import updateProtocolsExcerpt from './updateProtocolsExcerpt'
import proxyProtocolsLibrary from './proxyProtocolsLibrary'

export default async (props) => {
  const { protocol, options } = props
  const cache = {}
  const protocolsExcerpt = {}


  await protocol.load({ servableConfig: options })

  const protocols = await extractProtocol({
    protocol,
    protocolsLibrary: async protocolPayload => proxyProtocolsLibrary({ ...props, protocolPayload }),
    cache,
    updateProtocolsExcerpt: async _props => updateProtocolsExcerpt({ ..._props, protocolsExcerpt })
  })

  return {
    protocols,
    protocolsExcerpt
  }
}
