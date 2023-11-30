import { ProtocolEnum, DataTemplateType } from "../../../../manifest/enums.js"
import access from '../../../../manifest/access/index.js'

export default async props => {
  const { path, extraction, includeAuxiliary = true } = props
  const payload = []

  const target = await access({
    item: ProtocolEnum.Class.Index,
    type: DataTemplateType.Class,
    path,
    extraction
  })
  if (target && target.data) {
    const { astAdapted } = target.data
    if (astAdapted) {
    }
  }

  return { payload, name: 'Seed', id: 'seed' }
}
