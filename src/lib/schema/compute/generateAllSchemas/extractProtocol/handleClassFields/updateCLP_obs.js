export default async ({ items }) => {
    return Promise.all(items.map(updateClassCLP))
}

const updateClassCLP = async (item) => {
    try {
        console.log("[Servable]", '------------------------ updating CLP', item.className)
        const object = new Servable.App.Schema(item.className)
        const { classLevelPermissions } = item
        object.setCLP(classLevelPermissions)
        await object.update()
    } catch (e) {
        console.error('updateClassCLP', error)
    }
}
