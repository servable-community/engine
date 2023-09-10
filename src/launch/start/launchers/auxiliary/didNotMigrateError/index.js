import getStateForConfiguration from "../../../../../utils/utilsDatabase/parseServerState/functions/getStateForConfiguration"
import MigrationStateEnum from "../../../../../utils/utilsDatabase/parseServerState/enums/migrationState"


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
