import extract from '../extract/index.js'
import accessChildInTreeWithRoute from './accessChildInTreeWithRoute.js'
import sanitizePath from 'path-sanitizer'

export default async ({
  path,
  extraction,
  item,
  type
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

  return result
}
