import extract from '../extract/index.js'
import accessChildInTreeWithRoute from './accessChildInTreeWithRoute.js'
import sanitizePath from 'path-sanitizer'

export default async ({
  path,
  extraction,
  item,
  type,
  formatData = true
}) => {

  if (!extraction && path) {
    extraction = await extract({ path: `/${sanitizePath(path)}`, dataTemplateType: type })
  }

  if (!extraction) {
    return null
  }

  const { reference, tree } = extraction
  const result = accessChildInTreeWithRoute({ item, tree })
  if (!result) {
    return null
  }

  if (formatData && result.data) {
    switch (result.type) {
      default: break
      case 'file': {
        if (!result.data.length) {
          break
        }
        result.data = result.data[0]
      } break
    }
  }

  return result
}
