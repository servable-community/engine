import targetComposePath from './utils/targetDockerComposePath'
import checkFileExists from '../../../utils/checkFileExists'

export default async (props) => {
    const {
        item,
        existingDockerCompose
    } = props
    // return true

    if (!(await item.loader.systemDockerComposeExists())) {
        return false
    }

    const targetPath = targetComposePath({ item })
    if (!(await checkFileExists(targetPath))) {
        return true
    }

    // if (!existingDockerCompose) {
    //     return true
    // }

    // const { services } = existingDockerCompose

    return false
}

const servicesHaveChanged = (previous, current) => {
    if (previous.length !== current.length) {
        return true
    }

    return false
}