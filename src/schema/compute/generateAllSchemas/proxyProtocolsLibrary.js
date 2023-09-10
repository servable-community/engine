import * as Factory from '../../../protocols/factory'

export default async ({ protocolsLibrary, protocolPayload, options }) => {
  // const { id } = protocolPayload
  // if (cache[id]) {
  //   return cache[id]
  // }

  if (protocolsLibrary) {
    const payload = await protocolsLibrary(protocolPayload)
    if (payload) {
      const item = await Factory.createProtocol(payload)
      await item.load({ servableConfig: options })
      return item
    }
  }

  const item = await Factory.createProtocol(protocolPayload)
  await item.load({ servableConfig: options })
  return item
}