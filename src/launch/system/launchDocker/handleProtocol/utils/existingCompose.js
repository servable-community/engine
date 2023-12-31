import targetComposePath from './targetDockerComposePath.js'
import checkFileExists from '../../../../utils/checkFileExists.js'
import * as compose from 'docker-compose'
import targetDockerPath from './targetDockerPath.js'

export default async (props) => {
  const {
    item,
  } = props

  const targetPath = targetComposePath({ item })
  if (!(await checkFileExists(targetPath))) {
    return null
  }

  const targetPathDocker = targetDockerPath({ item })
  const config = await compose.config({
    cwd: targetPathDocker,
  })

  return config.data.config
}

