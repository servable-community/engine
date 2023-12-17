import boot from './boot/index.js'
import handleDistribution from './handleDistribution/index.js'
// import memwatch from 'node-memwatch-x'

export default async (props) => {
  console.log('[SERVABLE]', '[DEBUG]', 'launch>start> ff ')
  const { servableEngineConfig, frameworkAdapter } = props
  let hd = null
  let launchedServer = null

  try {
    // hd = new memwatch.HeapDiff()
    console.log('[SERVABLE]', '[DEBUG]', 'launch>start> ')
    launchedServer = await boot(props)
    if (launchedServer) {
      await handleDistribution({ launchedServer, servableEngineConfig, frameworkAdapter })
    }

  } catch (e) {
    console.error('[SERVABLE]', '[DEBUG]', 'launch>start', e)
  }
  finally {
    if (hd) {
      const diff = hd.end()
      console.log('[SERVABLE]', '[DEBUG]', 'launch>start>heapdiff', diff)
    }
  }

  return launchedServer
}
