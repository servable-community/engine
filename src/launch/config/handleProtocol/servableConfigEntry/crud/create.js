import fill from "./fill"

export default async (props) => {

    const object = new Servable.App.Object('ServableConfigEntry')
    await fill({ ...props, object })
    return object
}
