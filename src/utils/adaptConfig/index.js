import basic from "./basic"
import setConfigurations from "./setConfigurations"


export default (props) => {
    // const { servableConfig, live = false } = props
    basic(props)
    setConfigurations(props)
}