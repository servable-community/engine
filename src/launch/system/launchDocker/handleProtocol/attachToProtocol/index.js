
export default async (props) => {
    const { schema, servableEngineConfig, config, item, } = props

    item.system = {
        ...(item.system ? item.system : {}),
        docker: config
    }
}
