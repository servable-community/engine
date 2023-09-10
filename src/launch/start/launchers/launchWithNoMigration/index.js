import doLaunch from "../doLaunch"

export default async ({ schema, configuration, app }) => {

  const { liveClasses } = schema
  let config = { ...configuration.config }
  config = {
    ...config,
    parse: {
      ...config.parse,
      liveQuery: {
        ...(config.liveQuery ? config.liveQuery : {}),
        classNames: liveClasses,
      },
    }
  }

  const server = await doLaunch({
    config,
    app
  })
  Servable.schema = schema
  return { config, server }
}