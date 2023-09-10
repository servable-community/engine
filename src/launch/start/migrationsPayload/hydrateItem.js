export default async ({ protocol, version, direction }) => {

  const up = await protocol.loader.schemaVersionOf({
    version,
    subPath: 'migration/up/index.js'
  })

  const down = await protocol.loader.schemaVersionOf({
    version,
    subPath: 'migration/down/index.js'
  })

  if (direction === 'up' && !up) {
    return null
  }

  if (direction === 'down' && !down) {
    return null
  }

  return {
    version,
    up,
    down
  }
}