import adaptConfig from "../../utils/adaptConfig"
import adaptSystemPayloads from "../adaptSystemPayloads"
import docker from "./docker"

export default async (props) => {
    const { schema, servableConfig } = props
    const dockerSystems = await docker(props)
    // return [...dockerSystems]

    await adaptSystemPayloads({ schema, servableConfig })
    let payload = {}
    const appSystem = schema.appProtocol.system
    if (appSystem) {
        payload = appSystem.payload
    }

    adaptConfig({
        servableConfig,
        payload,
        live: true
    })
}
