import didMigrateStepSuccessfully from '../../launchers/auxiliary/didMigrateStepSuccessfully/index.js'
import launchWithMigration from '../../launchers/launchWithMigration/index.js'
import extractSchema from '../../../../lib/schema/compute/index.js'
import Bluebird from 'bluebird'
import handleTask from './handleTask.js'

export default async (props) => {
  const { servableEngineConfig, migrationPayload, configuration, app } = props

  let schema = props.schema
  let i = 0
  let result
  do {
    const {
      direction,
      protocol,
      operations
    } = migrationPayload[i]

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
      schema = await extractSchema({ servableEngineConfig: _servableEngineConfig })
      if (!schema) {
        return null
      }

      result = await launchWithMigration({ schema, configuration, app })
      await didMigrateStepSuccessfully({
        configuration,
        schema
      })
    })
    i++
  } while (i < migrationPayload.length)

  return { ...result, schema }
}
