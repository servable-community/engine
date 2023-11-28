import buildProtocol from './build/protocol/index.js'
import writeProtocol from './write/protocol/index.js'

export default async props => {
  const { path, write = false } = props
  const payload = await buildProtocol({ path })
  if (write) {
    const written = await writeProtocol({ payload, path })
  }

  return payload
}
