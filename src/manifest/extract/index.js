import templateDataForId from './templateDataForId.js'
import extractItem from './extractItem.js'
import { DataTemplateType } from '../enums.js'
import ServableClass from "../../servable/index.js"

export default async ({
  path,
  dataTemplateType = DataTemplateType.Protocol
}) => {
  const reference = {}
  if (!global.Servable) {
    global.Servable = new ServableClass()
  }

  const item = templateDataForId(dataTemplateType)
  const tree = await extractItem({
    item,
    reference,
    parentLeafPath: path
  })

  return { reference, tree }
}
