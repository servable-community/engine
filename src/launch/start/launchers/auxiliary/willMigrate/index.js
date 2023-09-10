import getStateForConfiguration from "../../../../../utils/utilsDatabase/parseServerState/functions/getStateForConfiguration"
import adaptProtocols from "../../../utils/adaptProtocols"
// import adaptAppConfigBeforeSave from "../../../utils/adaptAppConfigBeforeSave"
import MigrationStateEnum from "../../../../../utils/utilsDatabase/parseServerState/enums/migrationState"


export default async (props) => {
  const item = await getStateForConfiguration(props)

  const { schema, configuration } = props
  // const { config: appConfig } = configuration
  const protocols = adaptProtocols({ protocols: schema.protocols })

  item.migrationState = MigrationStateEnum.Loading
  item.classesTarget = JSON.stringify(schema.appProtocol.schema.classes.all)
  item.protocolsTarget = protocols
    ? JSON.stringify(protocols)
    : null

  // item.appConfigTarget = adaptAppConfigBeforeSave(appConfig)

  item.updatedAt = Date.now()
  item.lastMigrationEndedAt = null
  item.lastMigrationStartedAt = Date.now()
  item.migrationsAttempts = item.migrationsAttempts + 1

  await item.save()
}