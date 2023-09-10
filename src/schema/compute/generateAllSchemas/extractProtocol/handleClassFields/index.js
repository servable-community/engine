import handleProtocolInClass from './handleProtocolInClass'
import Bluebird from "bluebird"
import adaptProtocolPayload from '../../../../../launch/utils/adaptProtocolPayload'
import extractProtocolsProtocols from './extractProtocolsProtocols'
import cleanProtocols from '../../../../../utils/cleanProtocols'


export default async (props) => {
    const {
        protocol,
        item,
        protocolsLibrary,
        options
    } = props

    const { className } = item

    try {

        const _class = await protocol.loader.getClass({ className })
        if (!_class) {
            return { item }
        }

        let classProtocols = await protocol.loader.getClassProtocols({
            className,
            withProtocolsProtocols: false
        })
        if (!classProtocols || !classProtocols.length) {
            return { item }
        }

        classProtocols = classProtocols.map(adaptProtocolPayload)

        if (!classProtocols || !classProtocols.length) {
            return { item }
        }

        let protocolsProtocols = await extractProtocolsProtocols({ ...props, classProtocols })
        let protocols = cleanProtocols([...classProtocols, ...protocolsProtocols])


        let _item = { ...item }
        await Bluebird.Promise.mapSeries(protocols,
            async (protocolItem) => {
                const protocol = await protocolsLibrary(protocolItem)
                _item = await handleProtocolInClass({
                    protocol,
                    item: _item
                })
            })
        return {
            item: _item,
            protocolsProtocols,
            classProtocols,
            protocols,
            _class
        }
    } catch (e) {
        console.error(e)
    }

    return { item }
}