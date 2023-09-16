import buildDryPayload from './buildDryPayload'
import _ from 'underscore'
import computeOperations from './computeOperations'

export default async (props) => {
  const { a, b } = props
  if (!a) {
    return null
  }

  const payload = await buildDryPayload(props)

  if (!payload || !payload.length) {
    return null
  }

  const { protocols } = props

  let items = await Promise.all(payload.map(async payload => {
    const protocol = _.findWhere(protocols, { id: payload.from.id })
    if (!protocol) {
      return null
    }
    return computeOperations({
      payload,
      protocol
    })
  }))

  items = items.filter(a => a)
  return items
}