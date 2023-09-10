import registerCloudCode from './registerCloudCode'
import registerJobs from './registerJobs'
import registerClasses from "./registerClasses"

export default async (props) => {
    const {
        item
    } = props

    const { classes: { own }, } = item.schema
    const prefix = item.id === 'app' ? null : item.id

    const cloudCodeFiles = await item.loader.cloudCodeFiles()
    await registerCloudCode({ files: cloudCodeFiles, prefix })

    const jobFiles = await item.loader.jobFiles()
    await registerJobs({ files: jobFiles, prefix })

    await registerClasses({
        ...props,
        protocol: item,
        items: own,
    })
}