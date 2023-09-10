import handleProtocol from "./handleProtocol"

export default async ({ schema }) => {
    const {
        protocols
    } = schema

    await Promise.all(protocols.map(async item => {
        await handleProtocol({
            item,
            allProtocols: protocols
        })
    }))
}
