import perform from '../../perform/index.js'

export default async (props) => {
  const {
    configuration,
    app,
    schema,
    frameworkAdapter
  } = props

  let result

  const bootConfig = { ...configuration.config }
  delete bootConfig.parse.schema
  await frameworkAdapter.doLaunch({
    config: bootConfig,
    app
  })
  Servable.schema = schema

  result = await perform(props)

  return {
    ...result,
  }
}
