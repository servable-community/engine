import performItem from './performItem.js'
import adaptProtocolPayload from '../../../../../../utils/adaptProtocolPayload.js'

export default async (props) => {
  const { request, protocol } = props
  const { object } = request
  // if (request.object.disposableOrphans) {
  //     const dd = object.disposableOrphans()
  //     console.log("[Servable]", dd)
  // }

  if (!object) {
    return
  }

  const { className } = object
  let items = await protocol.loader.classProtocols({ className })
  if (!items || !items.length) {
    return
  }

  items = items.map(adaptProtocolPayload)

  // const items = object.constructor.protocols
  //     ? object.constructor.protocols.map(adaptProtocolPayload)
  //     : []

  const cache = {}
  const Bluebird = (await import("bluebird")).default
  await Bluebird.Promise.mapSeries(
    items,
    async item => {
      await performItem({ ...props, items, item, cache })
    })
}
