import registerProtocol from "./registerProtocol"

export default async ({ schema }) => {
    const {
        protocols
    } = schema

    await Promise.all(protocols.map(async item => {
        await registerProtocol({
            item,
            allProtocols: protocols,
        })
    }))
}
