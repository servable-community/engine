import fill from "./fill"

export default async (props) => {

    const object = new Servable.App.Object('ServableConfigCondition')
    fill({ ...props, object })
    return object
}
