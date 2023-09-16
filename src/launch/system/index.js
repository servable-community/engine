import adaptConfig from "../../utils/adaptConfig"
import adaptSystemPayloads from "./adaptPayloads"
import docker from "./launchDocker"

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
