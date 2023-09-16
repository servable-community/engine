import { sha256, } from 'js-sha256'
import existingEntry from './existingEntry'

export default async (props) => {
    const {
        item,
        entry,
        transformer,
        validator, } = props

    const className = item.id
    if (!className) {
        return
    }

    const data = await transformer({ item: entry })
    if (validator && (await validator({ data }))) {
        return
    }

    let uniqueRef
    if (props.uniqueRef) {
        uniqueRef = await props.uniqueRef({ item: entry, transformedItem: data })
    } else {
        uniqueRef = sha256(JSON.stringify({ data }))
    }

    const sourceSHA = sha256(JSON.stringify({
        data,
        transformer: transformer.toString(),
        validator: validator ? validator.toString() : null,
        uniqueRef: uniqueRef ? uniqueRef.toString() : null,
    }))

    let object = await existingEntry({ className, uniqueRef })
    if (object) {
        if (object.get('manualableSourceSHA') === sourceSHA) {
            return
        }

        if (object.get('manualableMode') === 'manual') {
            // return
        }

        Object.keys(data).forEach(key => {
            object.set(key, data[key])
        })
    }
    else {
        // object = Servable.App.Object.fromJSON(
        //     {
        //         className,
        //         ...data
        //     }
        // )
        object = new Servable.App.Object(className)
        const keys = Object.keys(data)
        keys.forEach(key => {
            object.set(key, data[key])
        })
    }

    object.set('manualableSourceData', data)
    object.set('manualableSourceSHA', sourceSHA)
    object.set('uniqueRef', uniqueRef)
    const context = { manualableMode: 'auto' }

    // console.log(object)
    await object.save(null, { useMasterKey: true, ...context })
    return object
}

