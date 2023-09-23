import handleProtocol from './handleProtocol/index.js'
import Bluebird from "bluebird"
import candidates from '../../lib/config/candidates/index.js'

export default async (props) => {
  const { schema } = props
  const items = await candidates({ schema })

  const cache = {}
  await Bluebird.Promise.mapSeries(
    items,
    async candidate => {
      return handleProtocol({ ...props, operationProps: props, items, candidate, cache })
    })
}
