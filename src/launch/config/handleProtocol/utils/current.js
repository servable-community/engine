export default async (props) => {
    const {
        item
    } = props

    const config = await Servable.App.Config.get()
    const id = item.id

    if (!config) {
        return null
    }
    return config[id]
}
