import fill from "./fill"

export default async (props) => {

    const object = new Servable.App.Object('ServableConfigGroup')
    fill({ ...props, object })
    return object
}
