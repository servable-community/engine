import basic from "./basic.js"
import setConfigurations from "./setConfigurations/index.js"


export default (props) => {
  // const { servableEngineConfig, live = false } = props
  basic(props)
  setConfigurations(props)
}
