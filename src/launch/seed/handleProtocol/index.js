
export default async (props) => {
    const { classes: { own }, } = props.item.schema
    const id = props.item.id

    let items = []

    let protocolFile = await props.item.loader.seed()
    if (protocolFile) {
        let protocolMetadata = await props.item.loader.seedMetadata()
        const _i = {
            id,
            type: 'protocol',
            file: protocolFile,
            metadata: protocolMetadata
        }

        items.push(_i)
    }

    await Promise.all(own.map(async item => {
        const { className } = item
        let file = await props.item.loader.getClassSeed({ className })

        if (file) {
            let metadata = await props.item.loader.getClassSeedMetadata({ className })
            items.push({
                id: className,
                type: 'class',
                file,
                metadata
            })
        }
    }))

    return items.filter(a => a)
}