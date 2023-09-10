import handleProtocol from "./handleProtocol"
import bootstrapIfNeeded from "./handleProtocol/utils/bootstrapIfNeeded"

export default async (props) => {
    const { schema } = props
    const {
        protocols
    } = schema

    await bootstrapIfNeeded()

    await Promise.all(protocols.map(async item => {
        await handleProtocol({
            ...props,
            item,
            allProtocols: protocols
        })
    }))
}
