import fieldsToRemove from "./utils/fieldsToRemove"
import fieldsToAdd from "./utils/fieldsToAdd"
import current from "./utils/current"
import isProtocolConfigured from "./utils/isProtocolConfigured"

// import { diffString, diff } from 'json-diff'
export default async (props) => {
    const {
        item
    } = props

    let data = await item.loader.configData()
    if (!data) {
        return
    }

    if (!(await isProtocolConfigured(props))) {
        return
    }



    const currentConfig = await current(props)
    const differences = diff(current, data)
    const toRemove = await fieldsToRemove(props)
    const toAdd = await fieldsToAdd(props)


}
