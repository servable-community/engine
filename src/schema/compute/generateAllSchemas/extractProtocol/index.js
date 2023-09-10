import handleClassFields from './handleClassFields'
import _ from 'underscore'
import Bluebird from "bluebird"

const perform = async (props) => {
    const {
        protocolsLibrary,
        cache,
        updateProtocolsExcerpt
    } = props

    const { protocol } = props

    const _default = [
        protocol
    ]

    try {

        if (!(await protocol.loader.isValid())) {
            return _default
        }

        const classes = await protocol.loader.schemaClasses()
        if (!classes) {
            return _default
        }

        let adaptedClassesStructs = await Promise.all(classes.map(async item =>
            handleClassFields({
                protocol,
                item,
                protocolsLibrary,
            })))

        await updateProtocolsExcerpt({ adaptedClassesStructs })
        let ownClasses = adaptedClassesStructs.map(i => i.item)
        let protocolsRaw = adaptedClassesStructs.map(i => i.protocols)
        let jsClasses = adaptedClassesStructs.map(i => i._class).filter(a => a)

        protocolsRaw = _.flatten(protocolsRaw)
        protocolsRaw = protocolsRaw.filter(a => (a && a.id !== protocol.id))
        //#TODO Move from uniq to cleanprotocols
        protocolsRaw = _.uniq(protocolsRaw, a => a.id)

        if (!protocolsRaw || !protocolsRaw.length) {
            protocol.schema = {
                ...protocol.schema,
                classes: {
                    own: ownClasses,
                    all: ownClasses
                },
                jsClasses
            }
            return [protocol]
        }

        let subProtocols = await Bluebird.Promise.mapSeries(
            protocolsRaw,
            async protocolRaw => {

                const itemId = protocolRaw.id
                const protocol = await protocolsLibrary(protocolRaw)
                if (protocol && protocol.extractionStatus === 2) {
                    return protocol
                }

                await perform({
                    ...props,
                    protocol
                })

                // cache[itemId] = protocol
                return protocol
            })

        subProtocols = subProtocols.filter(a => a)
        subProtocols = _.flatten(_.flatten(subProtocols))
        // subProtocols = _.uniq(subProtocols, false, p => p.id)

        let all = [...ownClasses]
        subProtocols.forEach(element => {
            const { classes: { own: _own = [], all: _all = [] } = {} } = element.schema
            all = [...all, ..._all]
            all = _.uniq(all, 'className')
        })

        protocol.schema = {
            ...protocol.schema,
            classes: {
                own: ownClasses,
                all
            },
            jsClasses
        }
        protocol.extractionStatus = 2

        return [
            protocol,
            ...subProtocols
        ]
    }
    catch (e) {
        return _default
    }
}

export default perform