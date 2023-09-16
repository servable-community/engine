import _protocolsPayloadLibrary from "./protocolsPayloadLibrary"
import * as ProtocolsFactory from "../../../protocol/factory"
import getProtocolsLiveClasses from "./getProtocolsLiveClasses"
import generateAllSchemas from "./generateAllSchemas"
import adaptConfig from "../../../utils/adaptConfig/index.js"

export default async ({ servableEngineConfig }) => {
  const { rootProtocolPayload } = servableEngineConfig
  adaptConfig({ servableEngineConfig, live: false })

  const protocolsPayloadLibrary = async protocolPayload =>
    _protocolsPayloadLibrary({
      ...protocolPayload,
      options: servableEngineConfig
    })
  // Const payload = await protocolsPayloadLibrary({ id: process.env.SERVABLE_APP_ID, options })

  const appProtocol = await ProtocolsFactory.createProtocol({
    ...rootProtocolPayload
    // ProtocolsLibrary,
  })

  const { protocols, protocolsExcerpt } = await generateAllSchemas({
    protocolsPayloadLibrary,
    options: servableEngineConfig,
    protocol: appProtocol
  })

  const liveClasses = await getProtocolsLiveClasses({ protocols })

  return {
    protocols,
    protocolsExcerpt,
    appProtocol,
    liveClasses
  }
}
