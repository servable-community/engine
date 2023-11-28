import commentsParser from 'parse-comments'
import importFileAsText from "../../../../utils/importFileAsText.js"


export default async ({ file }) => {
  try {
    const { path } = file
    const text = await importFileAsText(path)
    const ast = commentsParser.parse(text)

    return {
      ...file,
      ast
    }
  } catch (e) {
    console.error(e)
  }

  return file
}
