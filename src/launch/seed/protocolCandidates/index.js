
export default async (props) => {
    const { classes: { own }, } = props.item.schema
    const id = props.item.id

    let items = []

    let protocolMode = await props.item.loader.seedMode()
    switch (protocolMode) {
        case 'auto': {
            let path = props.item.loader.seedFolder()
            let protocolMetadata = await props.item.loader.seedMetadata()
            const _i = {
                protocol: props.item,
                id,
                type: 'protocol',
                mode: 'auto',
                path,
                metadata: protocolMetadata
            }

            items.push(_i)
        } break
        case 'manual': {
            let protocolFile = await props.item.loader.seedManual()
            let protocolMetadata = await props.item.loader.seedMetadata()
            const _i = {
                protocol: props.item,
                id,
                type: 'protocol',
                mode: 'manual',
                file: protocolFile,
                metadata: protocolMetadata
            }

            items.push(_i)
        } break
        default: break
    }

    await Promise.all(own.map(async item => {
        const { className } = item
        let classMode = await props.item.loader.classSeedMode({ className })
        switch (classMode) {
            case 'auto': {
                let path = props.item.loader.classSeedFolder({ className })
                let files = await props.item.loader.classSeedAutoFiles({ className })
                let metadata = await props.item.loader.classSeedMetadata({ className })
                const _i = {
                    protocol: props.item,
                    id: className,
                    type: 'class',
                    metadata,
                    mode: 'auto',
                    path,
                    files
                }
                items.push(_i)
            } break
            case 'manual': {
                let file = await props.item.loader.classSeedManual({ className })
                let metadata = await props.item.loader.classSeedMetadata({
                    className
                })

                items.push({
                    protocol: props.item,
                    id: className,
                    type: 'class',
                    mode: 'manual',
                    file,
                    metadata
                })

            } break
            default: break
        }
    }))

    return items.filter(a => a)
}