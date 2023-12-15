import _protocolsPayloadLibrary from "./protocolsPayloadLibrary/index.js"
import * as ProtocolsFactory from "../../../protocol/factory/index.js"
import getProtocolsLiveClasses from "./getProtocolsLiveClasses.js"
import generateAllSchemas from "./generateAllSchemas/index.js"
import adaptConfigBasic from "../../../utils/adaptConfig/basic.js"

export default async ({ servableEngineConfig }) => {
  const { rootProtocolPayload } = servableEngineConfig
  adaptConfigBasic({ servableEngineConfig, live: false })

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
