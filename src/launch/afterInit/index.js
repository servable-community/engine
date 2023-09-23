import handleProtocol from "./handleProtocol/index.js"

export default async (props) => {
  const { schema } = props
  const {
    protocols
  } = schema

  await Promise.all(protocols.map(async item => {
    await handleProtocol({
      ...props,
      item,
      allProtocols: protocols
    })
  }))
}
