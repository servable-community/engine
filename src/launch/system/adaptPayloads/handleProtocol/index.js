import adaptDocker from './docker/index.js'

export default async (props) => {
  const {
    item,
    servableEngineConfig
  } = props

  const { system } = item
  if (!system) {
    return
  }

  const { docker } = system
  if (docker) {
    await adaptDocker(props)
  }
}
