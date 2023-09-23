import importJSONAsync from '../../../utils/importJSONAsync.js'
import local_v0_1_0 from '../../class/loader/local_v0_1_0/index.js'
import checkFileExists from '../../utils/checkFileExists.js'

const DEFAULT_LOADER = local_v0_1_0


export default async (props) => {
  const { path, version } = props

  if (version) {
    return loaderForVersion(version)
  }

  if (!path) {
    return null
  }

  let modulePath = `${path}/manifest.json`
  if (!(await checkFileExists(modulePath))) {
    modulePath = `${path}/module.json`
    if (!(await checkFileExists(modulePath))) {
      return DEFAULT_LOADER
    }
  }

  const module = await importJSONAsync(modulePath)
  const { version: moduleVersion } = module
  return loaderForVersion(moduleVersion)
}

const loaderForVersion = (version) => {
  switch (version) {
    default: return DEFAULT_LOADER
  }
}
