import checkFileExists from '../../../../launch/utils/checkFileExists.js'
import absoluteModuleSrcPath from './absoluteModuleSrcPath.js'

export default async (props) => {
  const { id, module, options } = props
  let protocolPath = null

  if (typeof module === 'object'
    && Object.keys(module).length) {
    const item = Object.keys(module)[0]
    if (item) {
      protocolPath = absoluteModuleSrcPath(item)
      return protocolPath
    }
  }

  if (options.protocols
    && options.protocols.external
    && options.protocols.external[id]) {
    protocolPath = absoluteModuleSrcPath(options.protocols.external[id])
    return protocolPath
  }

  if (options.protocols
    && options.protocols.local
    && options.protocols.local.length) {

    let i = 0
    do {
      const repo = options.protocols.local[i]
      protocolPath = `${repo}/${id}`
      if ((await checkFileExists(protocolPath))) {
        return protocolPath
      }
      i++
    } while (i < options.protocols.local.length)
  }

  return null
}
