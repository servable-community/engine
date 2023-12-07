export default async (props) => {
    const {
        item
    } = props

    let file = await item.loader.beforeInit()
    if (!file) {
        return
    }

    await file({ ...props, protocol: item })
}
