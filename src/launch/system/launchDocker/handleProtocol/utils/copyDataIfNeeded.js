import ensureDirectoryExistsSync from "../../../../utils/ensureDirectoryExistsSync.js"
import checkFileExists from '../../../../utils/checkFileExists.js'
import copyDir from '../../../../utils/copyDir.js'
import targetDockerPath from "./targetDockerPath.js"

export default async (props) => {
    const {
        item,
        data
    } = props


    let dataPath = item.loader.systemDockerDataPath()
    if (!(await checkFileExists(dataPath))) {
        return
    }

    const _target = targetDockerPath({ item })
    ensureDirectoryExistsSync(_target)
    copyDir(dataPath, _target)
}

