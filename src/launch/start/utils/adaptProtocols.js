import { sha256, } from 'js-sha256'


export default async ({ protocols }) => {
  return Promise.all(protocols.map(adaptProtocol))
}

const adaptProtocol = async (item) => {
  const classes = await item.loader.schemaClasses()
  const schema = await item.loader.schema()
  const schemaSHA = sha256(JSON.stringify(schema ? schema : classes))

  return {
    id: item.id,
    version: item.version,
    classes,
    schema,
    schemaSHA,
  }
}