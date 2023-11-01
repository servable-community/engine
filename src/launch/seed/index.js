import protocolCandidates from "./protocolCandidates/index.js"
import handleProtocol from './handleProtocol/index.js'
import Bluebird from "bluebird"
import _ from 'underscore'

export default async (props) => {
  const { schema } = props
  const {
    protocols
  } = schema
  try {
    console.log("[Servable]", `Launch > Seed > Start`)
    const items = _.flatten(await Promise.all(protocols.map(async item =>
      protocolCandidates({
        item,
        allProtocols: protocols
      })
    ))).filter(a => a)

    const cache = {}
    await Bluebird.Promise.mapSeries(
      items,
      async item => {
        return handleProtocol({ ...props, operationProps: props, items, item, cache })
      })
    console.log("[Servable]", `Launch > Seed > End`)
  } catch (e) {
    console.error("[Servable]", `Launch > Seed > Error`, e)
  }
}
