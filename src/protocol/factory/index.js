import Protocol from "../class/base/index.js"
import loader from './loader/index.js'

export const createProtocol = async (props) => {
  const _loader = await loader(props)
  const item = new Protocol({
    ...props,
  })
  item.loader = _loader
  return item
}
