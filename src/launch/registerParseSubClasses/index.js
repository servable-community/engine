import registerProtocol from "./registerProtocol/index.js"

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
