import * as ProtocolsFactory from '../../../../protocol/factory/index.js'

export default async ({ protocolsPayloadLibrary, protocolPayload, options }) => {
  // const { id } = protocolPayload
  // if (cache[id]) {
  //   return cache[id]
  // }

  if (protocolsPayloadLibrary) {
    const payload = await protocolsPayloadLibrary(protocolPayload)
    if (payload) {
      const item = await ProtocolsFactory.createProtocol(payload)
      await item.load({ servableEngineConfig: options })
      return item
    }
  }

  const item = await ProtocolsFactory.createProtocol(protocolPayload)
  await item.load({ servableEngineConfig: options })
  return item
}
