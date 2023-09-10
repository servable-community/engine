import boot from './boot'
import handleDistribution from './handleDistribution'

export default async (props) => {
  const { servableConfig } = props
  const launchedServer = await boot(props)
  if (!launchedServer) {
    return null
  }

  await handleDistribution({ launchedServer, servableConfig })
  return launchedServer
}
