import adaptAppProtocol from "./adaptAppProtocol.js"
import adaptGenericProtocol from "./adaptGenericProtocol.js"

export default async (props) => {
  const { schema, servableEngineConfig, item } = props
  let payload
  const adaptPayloadProps = {
    config: item.system.docker,
    item,
    servableEngineConfig,
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
