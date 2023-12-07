import manual from "./manual/index.js"
import auto from "./auto/index.js"

export default async (props) => {
  const { item } = props
  const { mode } = item

  switch (mode) {
    default:
    case 'manual': {
      await manual(props)
    } break
    case 'auto': {
      await auto(props)
    } break
  }
}
