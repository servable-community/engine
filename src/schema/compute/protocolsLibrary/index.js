import _ from 'underscore'

import protocolPath from './protocolPath'

export default async (props) => {
  const path = await protocolPath(props)
  return { ...props, path }
}
