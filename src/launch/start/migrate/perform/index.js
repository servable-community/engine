import didMigrateStepSuccessfully from '../../launchers/auxiliary/didMigrateStepSuccessfully/index.js'
import { computeSchema } from '@servable/manifest'
import handleTask from './handleTask.js'

export default async (props) => {
  const { servableEngineConfig,
    migrationPayload,
    configuration,
    app,
    frameworkAdapter } = props

  let schema = props.schema
  let i = 0
  let result
  do {
    const {
      direction,
      protocol,
      operations
    } = migrationPayload[i]

    const Bluebird = (await import("bluebird")).default
    await Bluebird.Promise.mapSeries(operations, async operation => {
      const { protocolsExcerpt } = schema
      await handleTask({
        operation,
        direction,
        taskProps: {
          protocolsExcerpt,
          configuration,
        }
      })

      let _servableEngineConfig = { ...servableEngineConfig, versions: {} }
      _servableEngineConfig.versions[protocol.id] = operation.version
      schema = await computeSchema({ servableEngineConfig: _servableEngineConfig })
      if (!schema) {
        return null
      }

      result = await frameworkAdapter.launchWithMigration({ schema, configuration, app })
      await didMigrateStepSuccessfully({
        configuration,
        schema
      })
    })
    i++
  } while (i < migrationPayload.length)

  return { ...result, schema }
}
