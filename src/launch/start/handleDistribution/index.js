import pingPeriodically from '../../../utils/utilsDatabase/classes/parseServerInstance/functions/pingPeriodically'
import watchServer from './watch'


export default async (props) => {
  const { launchedServer, servableEngineConfig } = props
  const { configuration } = launchedServer
  const { distribution } = servableEngineConfig
  if (!distribution || !distribution.enabled) {
    return
  }

  await pingPeriodically({ configuration })
  await watchServer({ performProps: props, configuration })
}
