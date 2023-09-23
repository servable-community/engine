
import protocolPath from './protocolPath.js'

export default async (props) => {
  const path = await protocolPath(props)
  return { ...props, path }
}
