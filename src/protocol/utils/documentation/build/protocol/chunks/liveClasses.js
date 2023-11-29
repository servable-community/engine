import { ProtocolEnum } from "../../../../tree/enums.js"
import access from '../../../../tree/access/index.js'

export default async props => {
  const { path, extraction } = props
  const payload = []

  const target = await access({
    item: ProtocolEnum.LiveClasses,
    path,
    extraction
  })
  if (target && target.data) {
    const { astAdapted } = target.data
    if (astAdapted) {
    }
  }

  return { payload, name: 'Live Classes', id: 'liveClasses' }
}
