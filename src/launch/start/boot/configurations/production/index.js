import getStateForConfiguration from '../../../../../utils/utilsDatabase/parseServerState/functions/getStateForConfiguration'
import _ from 'underscore'
import getMigrations from '../../getMigrations'

const MAX_ATTEMPTS = 5
const MAX_DURATION = 120 //in second

import MigrationStateEnum from '../../../../../utils/utilsDatabase/parseServerState/enums/migrationState'
import ValidationStateEnum from '../../../../../utils/utilsDatabase/parseServerState/enums/validationState'


export default async (props) => {
  const {
    servableConfig: { configurations },
    schema,
    stagingStateItem } = props

  let configuration = _.findWhere(configurations, { key: 'production' })
  if (!configuration) {
    return {}
  }

  const stateItem = await getStateForConfiguration({ configuration })
  const migrations = await getMigrations({ schema, stateItem })

  if (stagingStateItem) {
    switch (stagingStateItem.validationState) {
      case ValidationStateEnum.Validated: {
        return {
          stateItem,
          configuration,
          migrations,
          shouldMigrate: true,
        }
      }
      case ValidationStateEnum.Invalidated: {
        return {
          stateItem,
          configuration,
          migrations,
        }
      }
      case ValidationStateEnum.Initial:
      default:
        {
          switch (stagingStateItem.migrationState) {
            case MigrationStateEnum.Loading:
            case MigrationStateEnum.LoadedSuccessfully:
            case MigrationStateEnum.ErrorLoading: {
              return {
                stateItem,
                configuration,
              }
            }
            default:
              break
          }
        }
        break
    }
  }

  switch (stateItem.migrationState) {
    case MigrationStateEnum.Initial: {
      // if (!stateItem.protocols) {
      //   return {
      //     stateItem,
      //     configuration,
      //     shouldMigrateReset: true,
      //   }
      // }

      return {
        stateItem,
        configuration,
        migrations,
        shouldMigrate: true,
      }
    }
    case MigrationStateEnum.Loading: {
      if (stateItem.lastMigrationStartedAt) {
        const delta = Math.abs(stateItem.lastMigrationStartedAt.getTime() - Date.now()) / 1000
        if (delta > MAX_DURATION) {
          return {
            stateItem,
            configuration,
            migrations,
            shouldMigrate: Boolean(
              migrations
              && migrations.length
              && stateItem.lastMigrationEndedAt)
          }
        }
      }

      if (stateItem.migrationsAttempts > MAX_ATTEMPTS) {
        return {
          stateItem,
          configuration,
          shouldQuit: true,
          shouldQuitError: new Error("Maximum attempts reached"),
          waitBeforeQuit: 0
        }
      }

      return {
        stateItem,
        configuration,
        shouldQuit: true,
        waitBeforeQuit: 5000,
        shouldQuitError: new Error("Another migration is being performed"),
      }
    }
    case MigrationStateEnum.LoadedSuccessfully: {
      return {
        stateItem,
        configuration,
      }
      // if (stateItem.migrationsAttempts > MAX_ATTEMPTS) {
      //   return {
      //     stateItem,
      //     configuration,
      //     shouldQuit: true,
      //     waitBeforeQuit: 5000,
      //     shouldQuitError: new Error("Migration attempts exceeded"),
      //   }
      // }
    } break
    default: break
  }

  return {
    stateItem,
    configuration,
    migrations,
    shouldMigrate: Boolean(
      migrations
      && migrations.length
      && stateItem.lastMigrationEndedAt)
  }
}