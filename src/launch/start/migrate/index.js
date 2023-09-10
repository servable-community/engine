import staging from "./configuration/staging"
import production from "./configuration/production"
import launchWithMigration from "../launchers/launchWithMigration"
import didMigrateSuccessfully from "../launchers/auxiliary/didMigrateSuccessfully"
import willMigrate from '../launchers/auxiliary/willMigrate'
import didNotMigrateError from '../launchers/auxiliary/didNotMigrateError'

export default async (props) => {
  const {
    configuration,
    hasBeenInitialized,
    schema,
    app
  } = props

  try {
    let result
    if (!hasBeenInitialized) {
      result = await launchWithMigration({
        schema,
        configuration,
        app
      })
    }
    // else if (!migrationPayload || !migrationPayload.length) {
    //   result = await launchWithNoMigration({
    //     schema,
    //     configuration,
    //     app
    //   })
    // }
    else {
      await willMigrate({
        configuration,
        schema,
      })

      switch (configuration.key) {
        case 'staging': {
          result = await staging(props)
        } break
        case 'production':
        default: {
          result = await production(props)
        } break
      }
    }

    let _schema = result.schema ? result.schema : schema
    await didMigrateSuccessfully({
      configuration,
      schema: _schema
    })
    // const { protocolsExcerpt } = _schema
    // await Servable.App.Config.save(null)

    return result

  } catch (error) {
    await didNotMigrateError({
      configuration,
      schema,
      error,
    })
    return {
      error
    }
  }
}