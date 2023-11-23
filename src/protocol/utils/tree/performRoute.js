import checkFileExists from "../../../utils/checkFileExists.js"
import importJSONAsync from "../../../utils/importJSONAsync.js"
import directoryFilesRecursive from '../../../utils/directoryFilesRecursive.js'
import formatFile from './formatFile.js'
import foldersInFolder from '../../../utils/foldersInFolder.js'

export default async (props) => {
  const { item, route, parentLeafPath } = props
  const { type,
    extensionType,
    // path,
    priority,
    children }
    = route

  const fullPath = `${parentLeafPath}/${route.path}`

  let files = null
  const result = {
    ...route,
    fullPath,
    leafPath: parentLeafPath
  }

  switch (type) {
    case 'folder': {
      result.leafPath = `${parentLeafPath}/${route.path}`
      break
    }
    case 'templateCollection': {
      result.leafPath = `${parentLeafPath}/${route.path}`

      if (!(await checkFileExists(fullPath))) {
        break
      }
      const folders = await foldersInFolder({ path: fullPath, })
      result.templateCollection = {
        folders
      }

      break
    }
    case 'filesCollection': {
      if (!(await checkFileExists(fullPath))) {
        break
      }

      files = await directoryFilesRecursive({ path: fullPath, includeMeta: true })
      if (files && files.length) {
        files = files.map(file => ({
          path: file.path,
          module: file.module
        }))
      }
    } break
    case 'file': {
      if (!(await checkFileExists(fullPath))) {
        break
      }

      switch (extensionType) {
        default:
        case 'js': {
          files = [{
            path: fullPath,
            module: await import(fullPath)
          }]
          break
        }
        case 'json': {
          files = [{
            path: fullPath,
            module: await importJSONAsync(fullPath)
          }]
          break
        }
      }
    } break
    default: break
  }



  if (files && files.length) {
    files = files.filter(a => a.module)
    if (files.length) {
      result.data = await Promise.all(files.map(async file => formatFile({ file })))
    }
  }

  return result
}