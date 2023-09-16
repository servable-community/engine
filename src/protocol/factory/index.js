import Protocol from "../class/base"
import loader from './loader'

export const createProtocol = async (props) => {
    const _loader = await loader(props)
    const item = new Protocol({
        ...props,
    })
    item.loader = _loader
    return item
}
