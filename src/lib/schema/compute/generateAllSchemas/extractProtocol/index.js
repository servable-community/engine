import handleClassFields from './handleClassFields/index.js'
import _ from 'underscore'

import adaptAppClasses from './adaptAppClasses/index.js'

const perform = async (props) => {
  const {
    protocolsPayloadLibrary,
    // cache,
    updateProtocolsExcerpt
  } = props

  const { protocol } = props

  const _default = [
    protocol
  ]
  // console.log('extractProtocol', protocol.id)
  try {

    if (!(await protocol.loader.isValid())) {
      console.log('protocol not valid', protocol.id, protocol.loader.path)
      return _default
    }

    const classes = await protocol.loader.schemaClasses()
    if (!classes) {
      return _default
    }

    if (protocol.id === 'app') {
      await adaptAppClasses({ classes })
    }

    let adaptedClassesStructs = await Promise.all(classes.map(async item =>
      handleClassFields({
        protocol,
        item,
        protocolsPayloadLibrary,
      })))


    await updateProtocolsExcerpt({ adaptedClassesStructs })
    let ownClasses = adaptedClassesStructs.map(i => i.item)
    let protocolsPayloads = adaptedClassesStructs.map(i => i.protocols)
    let jsClasses = adaptedClassesStructs.map(i => i._class).filter(a => a)

    protocolsPayloads = _.flatten(protocolsPayloads)
    protocolsPayloads = protocolsPayloads.filter(a => (a && a.id !== protocol.id))
    //#TODO Move from uniq to cleanprotocols
    protocolsPayloads = _.uniq(protocolsPayloads, a => a.id)

    // console.log('protocolsPayloads', protocolsPayloads,
    //   'ownClasses', ownClasses,
    //   'jsClasses', jsClasses,
    //   'classes', classes,
    //   'adaptedClassesStructs', adaptedClassesStructs
    // )

    if (!protocolsPayloads || !protocolsPayloads.length) {
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

    const Bluebird = (await import("bluebird")).default
    let classesProtocols = await Bluebird.Promise.mapSeries(
      protocolsPayloads,
      async protocolPayload => {

        // const itemId = protocolRaw.id
        const _protocol = await protocolsPayloadLibrary(protocolPayload)
        if (_protocol && _protocol.extractionStatus === 2) {
          return _protocol
        }

        const temp = await perform({
          ...props,
          protocol: _protocol
        })

        // cache[itemId] = protocol
        return temp
      })

    classesProtocols = _.flatten(classesProtocols)
    classesProtocols = classesProtocols.filter(a => a)
    classesProtocols = _.flatten(_.flatten(classesProtocols))
    classesProtocols = _.uniq(classesProtocols, 'id')
    // subProtocols = _.uniq(subProtocols, false, p => p.id)
    // console.log('classesProtocols', classesProtocols)

    let all = [...ownClasses]
    classesProtocols.forEach(element => {
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
      ...classesProtocols
    ]
  }
  catch (e) {
    console.error('[SERVABLE] extractProtocol', protocol.id, e)
    return _default
  }
}

export default perform
