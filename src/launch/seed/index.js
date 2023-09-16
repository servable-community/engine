import protocolCandidates from "./protocolCandidates"
import handleProtocol from './handleProtocol'
import Bluebird from "bluebird"
import _ from 'underscore'

export default async (props) => {
    const { schema } = props
    const {
        protocols
    } = schema

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
}
