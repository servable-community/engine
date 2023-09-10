import handleProtocol from "./handleProtocol"
import canStart from "./canStart"

export default async (props) => {
    const { schema, servableConfig } = props
    const {
        protocols,
        appProtocol,
    } = schema

    if (!(await canStart())) {
        console.warn(`Can't launch docker engines.`)
        return
    }

    if (!servableConfig.system.docker.environments.includes(process.env.NODE_ENV)) {
        return
    }

    const items = await Promise.all(protocols.map(async item => {
        return handleProtocol({
            ...props,
            item,
            allProtocols: protocols,
            appProtocol
        })
    }))

    return items.filter(a => a)
}
