import manual from "./manual"
import auto from "./auto"

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