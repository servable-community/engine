import buildProtocol from './build/protocol/index.js'

export default async props => {
  const { path, write = false } = props
  const payload = await buildProtocol({ path })
  if (write) {
    const writeProtocol = await import('./write/protocol/index.js')
    const written = await writeProtocol({ payload, path })
  }

  return payload
}
