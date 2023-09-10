import _ from 'underscore'
import Bluebird from "bluebird"
import performItem from './performItem'
import adaptProtocolPayload from '../../../../../../utils/adaptProtocolPayload'

export default async (props) => {
    const { request } = props
    const { object } = request
    // if (request.object.disposableOrphans) {
    //     const dd = object.disposableOrphans()
    //     console.log(dd)
    // }

    const items = object.constructor.protocols
        ? object.constructor.protocols.map(adaptProtocolPayload)
        : []

    const cache = {}
    await Bluebird.Promise.mapSeries(
        items,
        async item => {
            await performItem({ ...props, items, item, cache })
        })
}