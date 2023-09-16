import get from "../crud/get"
import create from "../crud/create"
import prepareModel from "./prepareModel"

export default async (props) => {
  const { entityId, type } = props

  const model = await prepareModel(props)

  let item = await get({ model, entityId, type })
  if (!item) {
    item = await create({ model, entityId, type })
  }

  if (!item) {
    throw new Error('Could not connect to util database')
  }

  return item
}