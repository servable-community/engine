import targetComposePath from "./targetDockerComposePath.js"
import fs from 'fs'
import ensureDirectoryExistsSync from "../../../../utils/ensureDirectoryExistsSync.js"

export default async (props) => {
  const {
    item,
    data
  } = props

  let targetPath = targetComposePath({ item })

  ensureDirectoryExistsSync(targetPath)
  return fs.promises.writeFile(targetPath, data)
}

