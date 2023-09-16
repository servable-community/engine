import duplicate from "../../../../../../utils/configuration/mongo/duplicate"
import tearDown from "../../tearDown"

export default async (props) => {
  const {
    configuration,
  } = props

  try {
    const { config: { parse } } = configuration
    await tearDown(props)

    return await duplicate({
      sourceUri: parse.sourceDatabaseURI,
      targetUri: parse.databaseURI,
    })

  } catch (e) {
    return e
  }
}