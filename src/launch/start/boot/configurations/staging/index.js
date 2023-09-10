import getStateForConfiguration from '../../../../../utils/utilsDatabase/parseServerState/functions/getStateForConfiguration'
import _ from 'underscore'
import getMigrations from '../../getMigrations'
import adaptConfiguration from './adaptConfiguration'
import MigrationStateEnum from '../../../../../utils/utilsDatabase/parseServerState/enums/migrationState'
import ValidationStateEnum from '../../../../../utils/utilsDatabase/parseServerState/enums/validationState'
import ParseServerInstanceGetRunningInstance from '../../../../../utils/utilsDatabase/parseServerInstance/functions/getRunningInstance'
const MAX_ATTEMPTS = 15
//const MAX_DURATION = 60 * 60 //in second
const MAX_DURATION = 10

export default async (props) => {
  const { servableConfig: { configurations }, schema } = props

  let configuration = _.findWhere(configurations, { key: 'staging' })
  if (!configuration || !configuration.enabled) {
    return {}
  }

  configuration = await adaptConfiguration({ configuration })
  const stateItem = await getStateForConfiguration({ configuration })
  const migrations = await getMigrations({ schema, stateItem })
  const shouldMigrate = (migrations && migrations.length)
  const runningInstance = await ParseServerInstanceGetRunningInstance({ configuration })

  switch (stateItem.validationState) {
    case ValidationStateEnum.Validated: {
      if (shouldMigrate) {
        // The migration has been validated, but another needed migration occured:
        // #TODO
        // return {
        //   stateItem,
        //   configuration,
        //   migrations,
        //   shouldMigrate
        // }
      }
      // The migration has been validated, no staging should be performed.
      return {
        stateItem,
        configuration,
      }
    }
    case ValidationStateEnum.Invalidated: {
      return {
        stateItem,
        configuration,
        migrations,
        shouldMigrate: (migrations && migrations.length),
      }
    }
    case ValidationStateEnum.Initial:
    default:
      break
  }

  switch (stateItem.migrationState) {
    case MigrationStateEnum.Initial: {
      return {
        stateItem,
        configuration,
        migrations,
        shouldMigrate: ((migrations && migrations.length) || !stateItem.protocols),
      }
    }
    case MigrationStateEnum.Loading: {
      if (stateItem.lastMigrationStartedAt) {
        const delta = Math.abs(stateItem.lastMigrationStartedAt.getTime() - Date.now()) / 1000
        if ((delta > MAX_DURATION)
          && (stateItem.migrationsAttempts <= MAX_ATTEMPTS)) {
          return {
            stateItem,
            configuration,
            migrations,
            shouldMigrate: (migrations && migrations.length),
          }
        }
      }

      return {
        stateItem,
        configuration,
        shouldQuit: true, //TODO
        waitBeforeQuit: 0,
        shouldQuitError: new Error("Another staging migration is being performed on the main database."),
      }
    }
    case MigrationStateEnum.LoadedSuccessfully: {

      return {
        stateItem,
        configuration,
        shouldRun: !runningInstance
        // #TODO
        // migrations,
        //shouldMigrate: (migrations && migrations.length),
      }
    }
    case MigrationStateEnum.ErrorLoading: {
      if (stateItem.migrationsAttempts < MAX_ATTEMPTS) {
        return {
          stateItem,
          configuration,
          migrations,
          shouldMigrate: (migrations && migrations.length),
        }
      }
    } break
    default:
      break
  }

  return {}
}