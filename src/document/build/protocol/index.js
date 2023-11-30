import { ProtocolEnum } from "../../../manifest/enums.js"
// import append from "../utils/builder/append.js"
import access from '../../../manifest/access/index.js'
import buildSeed from './chunks/seed.js'
import buildProtocolClass from './chunks/class.js'
import buildConfig from './chunks/config.js'
import buildLiveClasses from './chunks/liveClasses.js'
import buildAfterInit from './chunks/afterInit.js'
import buildBeforeInit from './chunks/beforeInit.js'
import buildFunctions from './chunks/functions.js'
import buildSchema from './chunks/schema.js'
import buildSystem from './chunks/system.js'
import buildLib from './chunks/lib.js'
import buildTriggers from './chunks/triggers.js'
import documentClass from '../class/index.js'

export default async props => {
  const { path, includeChunksInMain = true } = props
  let payload = []

  let extraction = null
  let index = await access({
    item: ProtocolEnum.Index,
    extraction,
    path
  })
  if (index && index.data && index.data.module) {
    const { name, description, id, version } = index.data.module
    payload.push({ h1: name })
    payload.push({ h2: `#${id}` })
    payload.push({ p: `#${version}` })
    payload.push({ p: description })
    payload.push({ hr: "" })
  }
  const chunks = {}

  chunks.seed = await buildSeed({ path })
  payload.push({ h2: chunks.seed.name })
  payload.concat(chunks.seed.payload)

  chunks.protocolClass = await buildProtocolClass({ path })
  payload.push({ h2: chunks.protocolClass.name })
  payload.concat(chunks.protocolClass.payload)

  chunks.beforeInit = await buildBeforeInit({ path })
  payload.push({ h2: chunks.beforeInit.name })
  payload.concat(chunks.beforeInit.payload)

  chunks.afterInit = await buildAfterInit({ path })
  payload.push({ h2: chunks.afterInit.name })
  payload.concat(chunks.afterInit.payload)

  chunks.config = await buildConfig({ path })
  payload.push({ h2: chunks.config.name })
  payload.concat(chunks.config.payload)

  chunks.functions = await buildFunctions({ path })
  payload.push({ h2: chunks.functions.name })
  payload.concat(chunks.functions.payload)

  chunks.liveClasses = await buildLiveClasses({ path })
  payload.push({ h2: chunks.liveClasses.name })
  payload.concat(chunks.liveClasses.payload)

  chunks.schema = await buildSchema({ path })
  payload.push({ h2: chunks.schema.name })
  payload.concat(chunks.schema.payload)

  chunks.system = await buildSystem({ path })
  payload.push({ h2: chunks.system.name })
  payload.concat(chunks.system.payload)

  chunks.lib = await buildLib({ path })
  payload.push({ h2: chunks.lib.name })
  payload.concat(chunks.lib.payload)

  chunks.triggers = await buildTriggers({ path })
  payload.push({ h2: chunks.triggers.name })
  payload.concat(chunks.triggers.payload)

  payload = payload.filter(a => a)



  let classes = null
  const _classes = await access({
    item: ProtocolEnum.Classes,
    path
  })
  if (_classes && _classes.children) {
    classes = await Promise.all(_classes.children.map(async _class => documentClass({
      path: _class.fullPath
    })))
  }

  return {
    payload,
    chunks,
    classes
  }
}
