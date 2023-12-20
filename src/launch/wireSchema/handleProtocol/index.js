import registerCloudCode from './registerCloudCode/index.js'
import registerRoutes from './registerRoutes/index.js'
import registerJobs from './registerJobs/index.js'
import registerClasses from "./registerClasses/index.js"

export default async (props) => {
  const {
    item
  } = props

  const { classes: { managed }, } = item.schema
  const prefix = item.id === 'app' ? null : item.id

  const functions = await item.loader.functions()
  await registerCloudCode({ files: functions, prefix })

  const routes = await item.loader.routes()
  await registerRoutes({ files: routes, prefix })

  const jobs = await item.loader.jobFiles()
  await registerJobs({ files: jobs, prefix })

  await registerClasses({
    ...props,
    protocol: item,
    items: managed,
  })
}
