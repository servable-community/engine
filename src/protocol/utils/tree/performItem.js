import performRoute from './performRoute.js'
import templateDataForId from './templateDataForId.js'

const performItem = async (props) => {
  const {
    item,
    reference = {},
    parentLeafPath,
    prefix } = props

  const { id, routes, name, } = item

  const result = {
    ...item,
  }

  if (routes && routes.length) {
    const _routes = routes.sort(a => a.priority)

    for (var i = 0; i < _routes.length; i++) {
      result.computed = await performRoute({
        ...props,
        route: _routes[i],
        parentLeafPath
      })
      if (result.computed && result.computed.data && result.computed.data.length) {
        break
      }
    }

    if (result.computed && result.computed.children && result.computed.children.length) {
      result.children = await Promise.all(result.computed.children.map(async a =>
        performItem({
          ...props,
          item: a,
          parentLeafPath: result.computed.leafPath
        })))
    }

    if (result.computed && result.computed.templateCollection && result.computed.templateCollection.folders && result.computed.templateCollection.folders.length) {
      const { templateId } = result.computed
      const templateData = templateDataForId(templateId)

      await Promise.all(result.computed.templateCollection.folders.map(async (folder, index) => {
        const { stat, name } = folder
        await performItem({
          ...props,
          item: templateData,
          parentLeafPath: folder.path,
          prefix: `${templateId}-${index}`
        })
      }))
    }

    if (result.computed && result.computed.fullPath) {
      // reference[result.route.fullPath] = result
      reference[prefix ? `${prefix}-${result.id}` : result.id] = result
    }

    return result
  }
}

export default performItem
