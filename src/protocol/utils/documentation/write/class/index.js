import sanitizePath from 'path-sanitizer'
import fse from 'fs-extra'

export default async ({ payload, path }) => {
  const { protocol, classes } = payload
  const rootPath = sanitizePath(`${path}/documentation/generated`)

  const protocolPath = `/${rootPath}/index.md`
  await fse.outputFile(protocolPath, protocol)
}
