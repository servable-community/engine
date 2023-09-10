import registerTriggers from './registerTriggers'
import registerCloudCode from '../registerCloudCode'
import registerJobs from '../registerJobs'

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

        const cloudCodeFiles = await protocol.loader.getClassCloudCode({ className })
        await registerCloudCode({ files: cloudCodeFiles, prefix })

        const jobFiles = await protocol.loader.getClassJobs({ className })
        await registerJobs({ files: jobFiles, prefix })
    }))
}

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}