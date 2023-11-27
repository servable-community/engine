import templateDataForId from './templateDataForId.js'
import performItem from './performItem.js'
import { DataTemplateType } from '../enums.js'

export default async ({ path, dataTemplateType = DataTemplateType.Protocol }) => {
  const reference = {}
  const item = templateDataForId(dataTemplateType)
  const tree = await performItem({ item, reference, parentLeafPath: path })
  // console.log({ reference, tree })
  return { reference, tree }
}
