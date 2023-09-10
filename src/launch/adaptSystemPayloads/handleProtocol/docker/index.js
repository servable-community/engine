import adaptAppProtocol from "./adaptAppProtocol"
import adaptGenericProtocol from "./adaptGenericProtocol"

export default async (props) => {
    const { schema, servableConfig, item } = props
    let payload
    const adaptPayloadProps = {
        config: item.system.docker,
        item,
        servableConfig,
        schema
    }

    const adaptPayload = await item.loader.systemDockerPayloadAdapter()
    if (adaptPayload) {
        payload = await adaptPayload(adaptPayloadProps)
    }
    else if (item.id === 'app') {
        payload = await adaptAppProtocol(adaptPayloadProps)
    }
    else {
        payload = await adaptGenericProtocol(adaptPayloadProps)
    }

    item.system = {
        ...(item.system ? item.system : {}),
        payload
    }
}
