import registerTriggers from './registerTriggers/index.js'
import registerCloudCode from '../registerCloudCode/index.js'
import registerJobs from '../registerJobs/index.js'

export default async (props) => {
  const {
    items,
    protocol
  } = props

  return Promise.all(items.map(async item => {
    await registerTriggers({ ...props, item })

    const { className } = item

    const prefix = protocol.id === 'app'
      ? null
      // : `${protocol.id}${capitalizeFirstLetter(className)}`
      : `${protocol.id}`

    const functions = await protocol.loader.classFunctions({ className })
    await registerCloudCode({ files: functions, prefix })

    const jobFiles = await protocol.loader.classJobs({ className })
    await registerJobs({ files: jobFiles, prefix })
  }))
}
