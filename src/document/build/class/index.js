import { ClassEnum, DataTemplateType } from "../../../manifest/enums.js"
// import append from "../utils/builder/append.js"
import access from '../../../manifest/access/index.js'
import buildSeed from './chunks/seed.js'
import buildClass from './chunks/class.js'
import buildFunctions from './chunks/functions.js'
import buildLib from './chunks/lib.js'
import buildTriggers from './chunks/triggers.js'

export default async props => {
  const { path, includeChunksInMain = true } = props
  let payload = []

  let name, id = null
  let extraction = null
  let index = await access({
    item: ClassEnum.Index,
    type: DataTemplateType.Class,
    path,
    extraction
  })
  if (index && index.data && index.data.module) {
    const { description = '' } = index.data.module
    name = index.data.module.id
    id = index.data.module.id
    payload.push({ h1: name })
    payload.push({ h2: `#${id}` })
    payload.push({ p: description })
    payload.push({ hr: "" })
  }
  else {
    payload.push({ h1: 'No name' })
  }
  const chunks = {}

  chunks.class = await buildClass({ path })
  payload.push({ h2: chunks.class.name })
  payload.concat(chunks.class.payload)

  chunks.seed = await buildSeed({ path })
  payload.push({ h2: chunks.seed.name })
  payload.concat(chunks.seed.payload)

  chunks.functions = await buildFunctions({ path })
  payload.push({ h2: chunks.functions.name })
  payload.concat(chunks.functions.payload)

  chunks.lib = await buildLib({ path })
  payload.push({ h2: chunks.lib.name })
  payload.concat(chunks.lib.payload)

  chunks.triggers = await buildTriggers({ path })
  payload.push({ h2: chunks.triggers.name })
  payload.concat(chunks.triggers.payload)

  payload = payload.filter(a => a)

  return {
    payload,
    chunks,
    name,
    id
  }
}
