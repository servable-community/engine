import adaptConfig from "../../utils/adaptConfig/index.js"
import adaptSystemPayloads from "./adaptPayloads/index.js"
import launchDocker from "./launchDocker/index.js"

export default async ({ schema, servableEngineConfig, frameworkBridge }) => {
  const dockerSystems = await launchDocker({ schema, servableEngineConfig })
  // return [...dockerSystems]

  await adaptSystemPayloads({ schema, servableEngineConfig })
  let payload = {}
  const appSystem = schema.appProtocol.system
  if (appSystem) {
    payload = appSystem.payload
  }

  adaptConfig({
    servableEngineConfig,
    payload,
    live: true,
    frameworkBridge
  })
}
