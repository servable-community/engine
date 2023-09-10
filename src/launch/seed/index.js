import handleProtocol from "./handleProtocol"
import performItem from './performItem'
import Bluebird from "bluebird"
import _ from 'underscore'

export default async (props) => {
    const { schema } = props
    const {
        protocols
    } = schema

    const items = _.flatten(await Promise.all(protocols.map(async item =>
        handleProtocol({
            item,
            allProtocols: protocols
        })
    ))).filter(a => a)

    const cache = {}
    await Bluebird.Promise.mapSeries(
        items,
        async item => {
            return performItem({ operationProps: props, items, item, cache })
        })
}
