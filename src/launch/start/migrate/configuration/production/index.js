import perform from '../../perform'
import doLaunch from '../../../launchers/doLaunch'

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