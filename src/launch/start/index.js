import boot from './boot'
import handleDistribution from './handleDistribution'

export default async (props) => {
  const { servableEngineConfig } = props
  const launchedServer = await boot(props)
  if (!launchedServer) {
    return null
  }

  await handleDistribution({ launchedServer, servableEngineConfig })
  return launchedServer
}