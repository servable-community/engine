import didMigrateStepSuccessfully from '../../launchers/auxiliary/didMigrateStepSuccessfully'
import launchWithMigration from '../../launchers/launchWithMigration'
import extractSchema from '../../../../schema/compute'
import Bluebird from 'bluebird'
import handleTask from './handleTask'

export default async (props) => {
  const { servableConfig, migrationPayload, configuration, app } = props

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

      let _servableConfig = { ...servableConfig, versions: {} }
      _servableConfig.versions[protocol.id] = operation.version
      schema = await extractSchema({ servableConfig: _servableConfig })
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