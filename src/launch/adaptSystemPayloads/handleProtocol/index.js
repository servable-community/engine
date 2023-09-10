import adaptDocker from './docker'

export default async (props) => {
    const {
        item,
        servableConfig
    } = props

    const { system } = item
    if (!system) {
        return
    }

    const { docker } = system
    if (docker) {
        await adaptDocker(props)
    }
}
