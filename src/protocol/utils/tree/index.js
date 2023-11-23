import templateDataForId from './templateDataForId.js'
import performItem from './performItem.js'

export default async ({ path }) => {
  const reference = {}
  const item = templateDataForId('protocol')
  const tree = await performItem({ item, reference, parentLeafPath: path })
  console.log({ reference, tree })
  return { reference, tree }
}
