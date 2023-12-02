import checkFileExists from "../../../utils/checkFileExists.js"
import importJSONAsync from "../../../utils/importJSONAsync.js"
import sanitizePath from 'path-sanitizer'
import fs from "fs"
import fse from 'fs-extra'
import imageToBase64 from './imageToBase64.js'
import mime from 'mime'
import extractFileWithVariants from './extractFileWithVariants.js'

export default async (props) => {
  const {
    mimeType,
    fullPath,
    variants
  } = props

  const extensionType = mime.getExtension(mimeType)

  let documentation = null
  const md = `/${sanitizePath(`${props.fullPath}.md`)}`
  if (await checkFileExists(md)) {
    documentation = await fs.promises.readFile(md, 'utf8')
    console.log(documentation)
  }

  let moduleImporter = {}

  switch (mimeType) {
    case 'image/png':
    case 'image/jpeg':
    case 'image/jpg':
    case 'image/gif':
    case 'image/webp': {
      moduleImporter = async ({ path }) => imageToBase64({
        path,
        mimeType
      })
      break
    }
    default:
    case 'text/markdown':
    case 'text/yaml':
    case 'image/svg+xml': {
      moduleImporter = async ({ path }) => fse.readFile(path, 'utf8')
      break
    }
    case 'text/javascript': {
      moduleImporter = async ({ path }) => import(path)
      break
    }
    case 'application/json': {
      moduleImporter = async ({ path }) => importJSONAsync(path)
      break
    }
    case 'text/yaml': {
      moduleImporter = async ({ path }) => fse.readFile(path, 'utf8')
      break
    }
  }

  const files = await extractFileWithVariants({
    variants,
    extensionType,
    moduleImporter,
    fullPath,
    payload: {
      mimeType,
      documentation,
    },
  })

  return files
}
