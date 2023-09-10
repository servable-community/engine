
import production from "./production"
import staging from "./staging"

export default (props) => {
    const { servableConfig, payload } = props
    const { configurations = [{}] } = servableConfig

    servableConfig.configurations = configurations.map(configuration => {
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

    return servableConfig
}