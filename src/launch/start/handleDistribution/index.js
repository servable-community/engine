import pingPeriodically from '../../../utils/utilsDatabase/parseServerInstance/functions/pingPeriodically'
import watchServer from './watch'


export default async (props) => {
  const { launchedServer, servableConfig } = props
  const { configuration } = launchedServer
  const { distribution } = servableConfig
  if (!distribution || !distribution.enabled) {
    return
  }

  await pingPeriodically({ configuration })
  await watchServer({ performProps: props, configuration })
}
