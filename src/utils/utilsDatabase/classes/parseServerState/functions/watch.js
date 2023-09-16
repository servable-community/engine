import schema from "../schema"
import mongoose from 'mongoose'
import getById from "../crud/getById"

export default async (props) => {
  const { onChange, } = props
  const model = mongoose.model('ParseServerState', schema)
  model.watch().on('change', async data => {
    const { documentKey: { _id } } = data
    console.log('ParseServerState changed:', data)
    let item = await getById({ model, id: _id })
    onChange && onChange({ item, data })
  })
}