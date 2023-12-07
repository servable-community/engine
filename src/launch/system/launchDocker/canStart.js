
import dockerUtils from 'mydockerjs/lib/docker-utils.js'

export default async (props) => {

  const _systemStatus = await systemStatus(props)
  if (!_systemStatus.shouldStart) {
    return false
  }


  return true
}

const systemStatus = async () => {
  let shouldStart = true
  let message = ''
  await new Promise((resolve, reject) => {
    dockerUtils.isDockerEngineRunning((err, isRunning) => {
      if (!isRunning) {
        shouldStart = false
      }
      resolve()
    })
  })
  await new Promise((resolve, reject) => {
    dockerUtils.isDockerComposeInstalled((err, isInstalled) => {
      if (!isInstalled) {
        shouldStart = false
      }
      resolve()
    })
  })

  return { shouldStart, message }
}
