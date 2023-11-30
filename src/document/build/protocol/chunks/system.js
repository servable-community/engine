import { ProtocolEnum } from "../../../../manifest/enums.js"
import access from '../../../../manifest/access/index.js'

export default async props => {
  const { path, extraction } = props
  const payload = []

  const target = await access({
    item: ProtocolEnum.System,
    path,
    extraction
  })
  if (target && target.data) {
    const { astAdapted } = target.data
    if (astAdapted) {
    }
  }

  return { payload, name: 'System', id: 'system' }
}
