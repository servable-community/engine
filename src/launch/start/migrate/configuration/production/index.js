import perform from '../../perform/index.js'
import doLaunch from '../../../launchers/doLaunch/index.js'

export default async (props) => {
  const {
    configuration,
    app,
    schema
  } = props

  let result

  const bootConfig = { ...configuration.config }
  delete bootConfig.parse.schema
  await doLaunch({
    config: bootConfig,
    app
  })
  Servable.schema = schema

  result = await perform(props)

  return {
    ...result,
  }
}
