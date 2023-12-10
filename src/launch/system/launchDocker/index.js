import handleProtocol from "./handleProtocol/index.js"
import canStart from "./canStart.js"

export default async ({ schema, servableEngineConfig }) => {

  const {
    protocols,
    appProtocol,
  } = schema

  if (!servableEngineConfig.system.docker.environments.includes(process.env.NODE_ENV)) {
    return null
  }

  if (!(await canStart())) {
    console.warn(`Can't launch docker engines.`)
    return
  }

  const items = await Promise.all(protocols.map(async item => {
    return handleProtocol({
      schema,
      servableEngineConfig,
      item,
      allProtocols: protocols,
      appProtocol
    })
  }))

  return items.filter(a => a)
}
