import migrate from '../migrate/index.js'
import quit from './quit.js'
import qualifyStaging from './payload/staging/index.js'
import qualifyProduction from './payload/production/index.js'
import didConsumeValidation from '../launchers/auxiliary/didConsumeValidation/index.js'
import tearDownDecoydatabase from "../migrate/configuration/utils/decoyDatabase/tearDown/index.js"

export default async (props) => {
  const { servableEngineConfig, app, schema, frameworkBridge } = props

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

  console.log('[SERVABLE]', '[DEBUG]', 'boot>staging params', stagingStateItem)

  const {
    stateItem: productionStateItem,
    configuration: productionConfiguration,
    shouldQuit: productionShouldQuit,
    shouldQuitError: productionShouldQuitError,
    shouldMigrate: productionShouldMigrate,
    waitBeforeQuit: productionWaitBeforeQuit,
    migrations: productionMigrations
  } = await qualifyProduction({ ...props, schema, stagingStateItem })

  console.log('[SERVABLE]', '[DEBUG]', 'boot>production params', productionStateItem)

  const hasBeenInitialized = productionStateItem.lastMigrationEndedAt
  let result

  /* #region STAGING */

  if (stagingShouldQuit) {
    console.log('[SERVABLE]', '[DEBUG]', 'boot>staging should quit')
    quit({
      delay: stagingWaitBeforeQuit,
      error: stagingShouldQuitError
    })
    return null
  }

  if (stagingShouldMigrate) {
    console.log('[SERVABLE]', '[DEBUG]', 'boot>staging should migrate')
    result = await migrate({
      app,
      hasBeenInitialized,
      schema,
      migrationPayload: stagingMigrations,
      servableEngineConfig,
      configuration: stagingConfiguration,
      frameworkBridge
    })

    if (result.error) {
      console.log('[SERVABLE]', '[DEBUG]', 'boot>staging result error', result.error)
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
    console.log('[SERVABLE]', '[DEBUG]', 'boot>staging should run')
    result = await frameworkBridge.launchWithNoMigration({
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
    console.log('[SERVABLE]', '[DEBUG]', 'boot>production should quit')
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
    console.log('[SERVABLE]', '[DEBUG]', 'boot>production should migrate')
    result = await migrate({
      app,
      hasBeenInitialized,
      schema,
      migrationPayload: productionMigrations,
      servableEngineConfig,
      configuration: productionConfiguration,
      frameworkBridge
    })

    if (result.error) {
      console.log('[SERVABLE]', '[DEBUG]', 'boot>production result error', result.error)
      quit(result)
      return null
    }

    if (stagingStateItem) {
      console.log('[SERVABLE]', '[DEBUG]', 'boot>production & staging decoy setup')
      await tearDownDecoydatabase({ configuration: stagingConfiguration })
      await didConsumeValidation({ configuration: stagingConfiguration })
    }

    return {
      ...result,
      schema,
      configuration: productionConfiguration,
    }
  }

  console.log('[SERVABLE]', '[DEBUG]', 'boot>launch with no migration')
  result = await frameworkBridge.launchWithNoMigration({
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
