
import production from "./production"
import staging from "./staging"

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