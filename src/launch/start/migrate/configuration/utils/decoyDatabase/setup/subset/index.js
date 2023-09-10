import tearDown from "../../tearDown"
import uriComps from "./uriComps"
import copyCollection from './copyCollection'

export default async (props) => {
  const {
    configuration,
  } = props

  try {
    await tearDown(props)

    const { config: { parse } } = configuration

    const sourceComps = await uriComps({ databaseURI: parse.sourceDatabaseURI })
    const targetComps = await uriComps({ databaseURI: parse.databaseURI })

    const fromCollectionsInfos = await sourceComps.database.listCollections().toArray()
    await Promise.all(fromCollectionsInfos.map(async collectionInfo => copyCollection({
      sourceComps,
      targetComps,
      collectionInfo
    })))

  } catch (e) {
    return e
  }
}

