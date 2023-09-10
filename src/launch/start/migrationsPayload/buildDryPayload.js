import semver from 'semver'
import _ from 'underscore'

export default async (props) => {
  const { a, b } = props

  const items = b.map(to => {
    const from = _.findWhere(a, { id: to.id })
    if (!from) {
      return null
    }

    if (!semver.valid(from.version)) {
      return null
    }
    if (semver.eq(to.version, from.version)) {
      return null
    }

    if (semver.lt(to.version, from.version)) {
      return {
        to,
        from,
        direction: 'down'
      }
    }

    return {
      to,
      from,
      direction: 'up'
    }
  })

  return items.filter(a => a)
}
