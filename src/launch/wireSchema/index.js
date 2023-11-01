import handleProtocol from "./handleProtocol/index.js"

export default async ({ schema }) => {
  const {
    protocols
  } = schema
  console.log("[Servable]", `Launch > Wire schema > Start`)
  await Promise.all(protocols.map(async item => {
    await handleProtocol({
      item,
      allProtocols: protocols
    })
  }))
  console.log("[Servable]", `Launch > Live query > Success`)
}
