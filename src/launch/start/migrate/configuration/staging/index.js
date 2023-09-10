import perform from '../../perform'
import setupDecoydatabase from '../utils/decoyDatabase/setup/subset'
// import tearDownDecoydatabase from '../utils/decoyDatabase/tearDown'
import doLaunch from '../../../launchers/doLaunch'
// import adaptConfigToConfiguration from './adaptConfigToConfiguration'
import launchWithMigration from '../../../launchers/launchWithMigration'

export default async (props) => {
  const {
    configuration,
    app,
    schema,
    migrationPayload
  } = props

  let result
  //TODO: double


  await setupDecoydatabase({ configuration, })

  if (!migrationPayload || !migrationPayload.length) {
    result = await launchWithMigration({
      schema,
      configuration,
      app
    })
  }
  else {
    const bootConfig = { ...configuration.config }
    delete bootConfig.parse.schema
    await doLaunch({
      config: bootConfig,
      app
    })
    Servable.schema = schema

    result = await perform({
      ...props,
    })
  }

  return result
}