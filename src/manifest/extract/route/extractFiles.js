import checkFileExists from "../../../utils/checkFileExists.js"
import importJSONAsync from "../../../utils/importJSONAsync.js"
import sanitizePath from 'path-sanitizer'
import fs from "fs"
import fse from 'fs-extra'
import imageToBase64 from './imageToBase64.js'
import mime from 'mime'

export default async (props) => {
  const {
    mimeType,
    fullPath,
  } = props

  const extensionType = mime.getExtension(mimeType)

  const _fullPath = `/${sanitizePath(`${fullPath}.${extensionType}`)}`

  if (!(await checkFileExists(_fullPath))) {
    return null
  }

  let documentation = null
  const md = `/${sanitizePath(`${fullPath}.md`)}`
  if (await checkFileExists(md)) {
    documentation = await fs.promises.readFile(md, 'utf8')
    console.log(documentation)
  }
  let files

  switch (mimeType) {
    default:
      break
    case 'image/png':
    case 'image/jpeg':
    case 'image/jpg':
    case 'image/gif':
    case 'image/webp': {
      files = [{
        path: _fullPath,
        mimeType,
        module: await imageToBase64({
          path: _fullPath,
          mimeType
        }),
        documentation
      }]
      break
    }
    case 'image/svg+xml': {
      files = [{
        path: _fullPath,
        mimeType,
        module: await fse.readFile(_fullPath, 'utf8'),
        documentation
      }]
      break
    }
    case 'text/javascript': {
      files = [{
        path: _fullPath,
        mimeType,
        module: await import(_fullPath),
        documentation
      }]
      break
    }
    case 'application/json': {
      files = [{
        path: _fullPath,
        mimeType,
        module: await importJSONAsync(_fullPath),
        documentation
      }]
      break
    }
    case 'text/yaml': {
      files = [{
        path: _fullPath,
        mimeType,
        module: await import(_fullPath),
        documentation
      }]
      break
    }
  }
  return files
}
