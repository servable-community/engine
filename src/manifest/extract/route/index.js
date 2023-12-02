import checkFileExists from "../../../utils/checkFileExists.js"
import directoryFilesRecursive from '../../../utils/directoryFilesRecursive.js'
import formatFile from '../formatFile.js'
import foldersInFolder from '../../../utils/foldersInFolder.js'
import sanitizePath from 'path-sanitizer'
import extractFiles from './extractFiles.js'

export default async (props) => {
  const { item, route, parentLeafPath } = props
  const { type,
    mimeTypes,
    variants = ['']
  }
    = route

  let fullPath = `/${sanitizePath(`${parentLeafPath}/${route.path}`)}`
  let files = null
  const result = {
    ...route,
    type,
    mimeTypes,
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
            module: file.module,
            //TODO: extensionType,
          }))
        }

      } break
      case 'file': {
        let _variants = variants
        if (!_variants.includes('')) {
          _variants = ['', ..._variants]
        }
        _variants = _variants.sort()
        for (var i = 0; i < mimeTypes.length; i++) {
          const mimeType = mimeTypes[i]

          files = await extractFiles({
            mimeType,
            fullPath,
            variants: _variants
          })
          if (files && files.length) {
            break
          }
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
    console.error('[SERVABLE]', 'performRoute', item, e)
  }
  return result
}
