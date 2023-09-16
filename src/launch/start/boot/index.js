import launchWithNoMigration from '../launchers/launchWithNoMigration'
import migrate from '../migrate'
import quit from './quit'
import qualifyStaging from './payload/staging'
import qualifyProduction from './payload/production'
import didConsumeValidation from '../launchers/auxiliary/didConsumeValidation'
import tearDownDecoydatabase from "../migrate/configuration/utils/decoyDatabase/tearDown"

export default async (props) => {
  const { servableEngineConfig, app, schema } = props

  const {
    stateItem: stagingStateItem,
    configuration: stagingConfiguration,
    shouldQuit: stagingShouldQuit,
    shouldRun: stagingShouldRun,
    shouldQuitError: stagingShouldQuitError,
    shouldMigrate: stagingShouldMigrate,
    waitBeforeQuit: stagingWaitBeforeQuit,
    migrations: stagingMigrations
  } = await qualifyStaging({ ...props, schema })

  const {
    stateItem: productionStateItem,
    configuration: productionConfiguration,
    shouldQuit: productionShouldQuit,
    shouldQuitError: productionShouldQuitError,
    shouldMigrate: productionShouldMigrate,
    waitBeforeQuit: productionWaitBeforeQuit,
    migrations: productionMigrations
  } = await qualifyProduction({ ...props, schema, stagingStateItem })

  const hasBeenInitialized = productionStateItem.lastMigrationEndedAt
  let result

  /* #region STAGING */

  if (stagingShouldQuit) {
    quit({
      delay: stagingWaitBeforeQuit,
      error: stagingShouldQuitError
    })
    return null
  }

  if (stagingShouldMigrate) {
    result = await migrate({
      app,
      hasBeenInitialized,
      schema,
      migrationPayload: stagingMigrations,
      servableEngineConfig,
      configuration: stagingConfiguration,
    })

    if (result.error) {
      quit(result)
      return null
    }

    return {
      ...(result ? result : {}),
      schema,
      configuration: stagingConfiguration,
    }
  }

  if (stagingShouldRun) {
    result = await launchWithNoMigration({
      app,
      schema,
      configuration: stagingConfiguration
    })
    return {
      ...(result ? result : {}),
      schema,
      configuration: stagingConfiguration,
    }
  }

  /* #endregion */


  /* #region PRODUCTION */
  if (productionShouldQuit) {
    quit({
      delay: productionWaitBeforeQuit,
      error: productionShouldQuitError
    })
    return
  }

  // if (productionShouldMigrateReset) {
  //   result = await launchWithMigration({ schema, configuration: productionConfiguration, })

  //   return {
  //     ...result,
  //     schema,
  //     configuration: productionConfiguration,
  //   }
  // }

  if (productionShouldMigrate) {
    result = await migrate({
      app,
      hasBeenInitialized,
      schema,
      migrationPayload: productionMigrations,
      servableEngineConfig,
      configuration: productionConfiguration,
    })

    if (result.error) {
      quit(result)
      return null
    }

    if (stagingStateItem) {
      await tearDownDecoydatabase({ configuration: stagingConfiguration })
      await didConsumeValidation({ configuration: stagingConfiguration })
    }

    return {
      ...result,
      schema,
      configuration: productionConfiguration,
    }
  }

  result = await launchWithNoMigration({
    app,
    schema,
    configuration: productionConfiguration
  })

  return {
    ...result,
    schema,
    configuration: productionConfiguration,
  }

  /* #endregion */
}