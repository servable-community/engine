import getStateForConfiguration from "../../../../../utils/utilsDatabase/classes/parseServerState/functions/stateForConfiguration"
import MigrationStateEnum from "../../../../../utils/utilsDatabase/classes/parseServerState/enums/migrationState"
import ValidationStateEnum from "../../../../../utils/utilsDatabase/classes/parseServerState/enums/validationState"

export default async (props) => {
  const item = await getStateForConfiguration(props)

  item.migrationState = MigrationStateEnum.Initial
  item.validationState = ValidationStateEnum.Initial

  item.updatedAt = Date.now()

  await item.save()
}