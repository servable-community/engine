import _protocolsLibrary from "./protocolsLibrary"
import * as ProtocolsFactory from "../../protocols/factory"
import getProtocolsLiveClasses from "./getProtocolsLiveClasses"
import generateAllSchemas from "./generateAllSchemas"
import adaptConfig from "../../utils/adaptConfig/index.js"

export default async ({ servableConfig }) => {
  const { rootProtocolPayload } = servableConfig
  adaptConfig({ servableConfig })

  const protocolsLibrary = async protocolPayload =>
    _protocolsLibrary({
      ...protocolPayload,
      options: servableConfig
    })
  // Const payload = await protocolsLibrary({ id: process.env.SERVABLE_APP_ID, options })

  const appProtocol = await ProtocolsFactory.createProtocol({
    ...rootProtocolPayload
    // ProtocolsLibrary,
  })

  const { protocols, protocolsExcerpt } = await generateAllSchemas({
    protocolsLibrary,
    options: servableConfig,
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
