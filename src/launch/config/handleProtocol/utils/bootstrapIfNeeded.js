export default async (props) => {

    const config = await Servable.App.Config.get({ useMasterKey: true })

    if (!config) {
        return
    }

    if (config.__servable) {
        return
    }

    config.__servable = {
        internals: {
            __servable: true
        }
    }

    await Servable.App.Config.save(config, { __servable: true })
}
