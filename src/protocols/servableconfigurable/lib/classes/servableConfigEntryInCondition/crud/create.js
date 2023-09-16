import fill from "./fill"

export default async (props) => {

    const object = new Servable.App.Object('ServableConfigEntryInCondition')
    fill({ ...props, object })
    return object
}
