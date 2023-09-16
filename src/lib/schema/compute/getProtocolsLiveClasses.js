import _ from 'underscore'

export default async ({ protocols }) => {
  let prots = (await Promise.all(protocols.map(async item => {
    const fn = await item.loader.liveClasses()
    if (!fn) {
      return null
    }
    return fn()
  }))).filter(a => a)
  prots = _.uniq(_.flatten(prots))
  return prots
}