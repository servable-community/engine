import current from "./current"

export default async (props) => {
    const {
        item,
        config,
        id
    } = props

    const { data, internal } = config
    const secrets = internal.reduce((a, v) => ({ ...a, [v]: true }), {})
    let _current = await current(props)
    let _secrets = {
        ...secrets,
        ..._current.__servable.internals
    }
    _current.__servable = {
        ..._current.__servable,
        internals: {
            ..._secrets,
        }
    }
    _current[id] = data

    await Servable.App.Config.save(_current, _secrets)
}
