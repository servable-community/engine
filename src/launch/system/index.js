import adaptConfig from "../../utils/adaptConfig/index.js"
import adaptSystemPayloads from "./adaptPayloads/index.js"
import docker from "./launchDocker/index.js"

export default async (props) => {
  const { schema, servableEngineConfig } = props
  const dockerSystems = await docker(props)
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
    live: true
  })
}
