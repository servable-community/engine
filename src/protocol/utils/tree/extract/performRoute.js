import checkFileExists from "../../../../utils/checkFileExists.js"
import importJSONAsync from "../../../../utils/importJSONAsync.js"
import directoryFilesRecursive from '../../../../utils/directoryFilesRecursive.js'
import formatFile from './formatFile.js'
import foldersInFolder from '../../../../utils/foldersInFolder.js'
import sanitizePath from 'path-sanitizer'
import fs from "fs"


export default async (props) => {
  const { item, route, parentLeafPath } = props
  const { type,
    extensionTypes,
    // path,
    priority,
    children }
    = route

  let fullPath = `/${sanitizePath(`${parentLeafPath}/${route.path}`)}`
  let files = null
  const result = {
    ...route,
    type,
    extensionTypes,
    fullPath,
    leafPath: parentLeafPath
  }
  try {
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

        files = await directoryFilesRecursive({
          path: fullPath,
          includeMeta: true
        })

        if (files && files.length) {
          files = files.map(file => ({
            path: file.path,
            module: file.module
          }))
        }

      } break
      case 'file': {
        for (var i = 0; i < extensionTypes.length; i++) {
          const extensionType = extensionTypes[0]
          const md = `/${sanitizePath(`${fullPath}.md`)}`
          const _fullPath = `/${sanitizePath(`${fullPath}.${extensionType}`)}`

          if (!(await checkFileExists(_fullPath))) {
            continue
          }

          let documentation = null
          if (await checkFileExists(md)) {
            documentation = await fs.promises.readFile(md, 'utf8')
            console.log(documentation)
          }

          switch (extensionType) {
            default:
            case 'js': {
              files = [{
                path: _fullPath,
                module: await import(_fullPath),
                documentation
              }]
              break
            }
            case 'json': {
              files = [{
                path: _fullPath,
                module: await importJSONAsync(_fullPath),
                documentation
              }]
              break
            }
          }
          break
        }

      } break
      default: break
    }


    result.leafPath = `/${sanitizePath(result.leafPath)}`

    if (files && files.length) {
      files = files.filter(a => a.module)
      if (files.length) {
        result.data = await Promise.all(files.map(async file => formatFile({ file })))
      }
    }
  } catch (e) {
    console.error(e)
  }
  return result
}
