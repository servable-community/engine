import getModule from "./getModule"

export default async (props) => {
    const module = await getModule(props)
    if (!module) {
        return null
    }
    return new module(props)
}