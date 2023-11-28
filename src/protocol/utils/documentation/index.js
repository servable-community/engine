import buildProtocol from './build/protocol/index.js'
import writeProtocol from './write/protocol/index.js'

export default async props => {
  const { path } = props
  const payload = await buildProtocol({ path })
  const written = await writeProtocol({ payload, path })

}
