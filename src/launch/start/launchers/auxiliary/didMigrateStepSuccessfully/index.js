import getStateForConfiguration from "../../../../../utils/utilsDatabase/parseServerState/functions/getStateForConfiguration"
import adaptProtocols from "../../../utils/adaptProtocols"
// import adaptAppConfigBeforeSave from "../../../utils/adaptAppConfigBeforeSave"

export default async (props) => {
  const item = await getStateForConfiguration(props)

  const { schema, configuration } = props
  // const { config: appConfig } = configuration
  const protocols = adaptProtocols({ protocols: schema.protocols })

  item.classes = JSON.stringify(schema.appProtocol.schema.classes.all)

  item.protocols = protocols
    ? JSON.stringify(protocols)
    : null

  // item.appConfig = adaptAppConfigBeforeSave(appConfig)
  item.updatedAt = Date.now()
  await item.save()
}