import schema from "../schema"
import mongoose from 'mongoose'
// import get from "../crud/get"

export default async (props) => {
  const { onShouldQuit, } = props
  const model = mongoose.model('ParseServerState', schema)
  model.watch().on('change', async data => {
    //   console.log('ParseServerState changed:', data)
    //   let item = await get({ model })
    //   if (!item) {
    //     return
    //   }
    //   const state = item.migrationState
    //   switch (state) {
    //     case 3:
    //     case 2: {

    //     } break
    //     default: {
    //       onShouldQuit()
    //     } break
    //   }
  })
}