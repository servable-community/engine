import basic from "./basic"
import setConfigurations from "./setConfigurations"


export default (props) => {
    // const { servableEngineConfig, live = false } = props
    basic(props)
    setConfigurations(props)
}