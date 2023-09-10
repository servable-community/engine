import * as compose from 'docker-compose'
import YAML from 'yaml'
import adaptServices from './adaptServices'
import shouldStart from './shouldStart'
import updateTargetCompose from './utils/updateTargetCompose'
import targetDockerPath from './utils/targetDockerPath'
import existingCompose from './utils/existingCompose'
import adaptForConsumption from './attachToProtocol'
import copyDataIfNeeded from './utils/copyDataIfNeeded'

export default async (props) => {
    const {
        item,
        servableConfig
    } = props

    const existingDockerCompose = await existingCompose({ item })
    if (!(await shouldStart({ item, existingDockerCompose }))) {
        return adaptForConsumption({ item, config: existingDockerCompose })
    }

    const _path = item.loader.systemDockerComposeDirPath()

    try {
        const config = await compose.config({
            cwd: _path,
        })

        let services = config.data.config.services

        config.data.config.services = await adaptServices({ services, item })
        const configAsString = YAML.stringify(config.data.config)
        await updateTargetCompose({ item, data: configAsString })
        await copyDataIfNeeded({ item, })
        const targetPath = targetDockerPath({ item })

        const result = await compose.upAll({
            cwd: targetPath,
            composeOptions: [
                ['--project-name', `${servableConfig.id}-${item.id}`],
                // ['--remove-orphans']
            ],
            callback: chunk => {
                console.log(`Docker compose up job in progres for ${item.id}: `, chunk.toString())
            }
        })

        return adaptForConsumption({ item, config: config.data.config })
    } catch (e) {
        console.error(e)
        throw (e)
    }

    return null
}
