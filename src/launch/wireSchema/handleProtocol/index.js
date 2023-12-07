import registerCloudCode from './registerCloudCode/index.js'
import registerJobs from './registerJobs/index.js'
import registerClasses from "./registerClasses/index.js"

export default async (props) => {
  const {
    item
  } = props

  const { classes: { own }, } = item.schema
  const prefix = item.id === 'app' ? null : item.id

  const functions = await item.loader.functions()
  await registerCloudCode({ files: functions, prefix })

  const jobs = await item.loader.jobFiles()
  await registerJobs({ files: jobs, prefix })

  await registerClasses({
    ...props,
    protocol: item,
    items: own,
  })
}
