import getStateForConfiguration from "../../../../../utils/utilsDatabase/classes/parseServerState/functions/stateForConfiguration.js"
import MigrationStateEnum from "../../../../../utils/utilsDatabase/classes/parseServerState/enums/migrationState.js"


export default async (props) => {
  const item = await getStateForConfiguration(props)
  const { error } = props

  item.migrationState = MigrationStateEnum.ErrorLoading
  item.updatedAt = Date.now()
  item.lastMigrationEndedAt = Date.now()
  // item.lastMigrationStartedAt = null
  item.migrationFailureError = error ? error.message : "No error provided"
  await item.save()
}
