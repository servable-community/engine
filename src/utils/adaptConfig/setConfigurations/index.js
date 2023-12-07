
import production from "./production/index.js"
import staging from "./staging/index.js"

export default (props) => {
  const { servableEngineConfig, payload } = props
  const { configurations = [{}] } = servableEngineConfig

  servableEngineConfig.configurations = configurations.map(configuration => {
    switch (configuration.key) {
      case 'staging': {
        return staging({ ...props, configuration })
      }
      default:
      case 'production': {
        return production({ ...props, configuration })
      }
    }
  })

  return servableEngineConfig
}
