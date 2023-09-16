import handleProtocol from "./handleProtocol"

export default async (props) => {
    const { schema, servableEngineConfig } = props
    const {
        protocols,
        appProtocol,
    } = schema

    const items = await Promise.all(protocols.map(async item => {
        return handleProtocol({
            ...props,
            item,
            allProtocols: protocols,
            appProtocol
        })
    }))
}
