import getModuleDir from '../../../../launch/utils/getModuleDir.js'

export default (item) => {
  const protocolPath = getModuleDir(item)
  if (!protocolPath) {
    return null
  }

  return `${protocolPath}/src`
}
