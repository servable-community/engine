import getStateForConfiguration from "../../../../../utils/utilsDatabase/parseServerState/functions/getStateForConfiguration"
import MigrationStateEnum from "../../../../../utils/utilsDatabase/parseServerState/enums/migrationState"
import ValidationStateEnum from "../../../../../utils/utilsDatabase/parseServerState/enums/validationState"

export default async (props) => {
  const item = await getStateForConfiguration(props)

  item.migrationState = MigrationStateEnum.Initial
  item.validationState = ValidationStateEnum.Initial

  item.updatedAt = Date.now()

  await item.save()
}