
import path from 'path'
// import callerPath from 'caller-path'
// import { dirname } from 'path'

export default ({ servableConfig }) => {
    if (servableConfig.adaptedBasic) {
        return
    }
    // const __filename = callerPath({ depth: 1 })
    // let __dirname = dirname(__filename)
    // __dirname = __dirname.split('file://')[1]

    // if (!servableConfig.nodeModulesPath) {
    //     servableConfig.nodeModulesPath = path.resolve(__dirname, `../node_modules`)
    // }

    if (!servableConfig.distribution) {
        servableConfig.distribution = {
            enabled: false,
        }
    }

    if (!servableConfig.distribution.databaseURI) {
        servableConfig.distribution.databaseURI = process.env.SERVABLE_UTILS_DATABASE_URI
    }


    if (!servableConfig.system) {
        servableConfig.system = {}
    }

    if (!servableConfig.system.docker) {
        servableConfig.system.docker = {
            enabled: true,
            environments: ['development']
        }
    }

    if (!servableConfig.protocols) {
        servableConfig.protocols = {}
    }

    if (!servableConfig.protocols.local || !servableConfig.protocols.local.length) {
        servableConfig.protocols.local = [
            path.resolve('', 'lib/protocols')
            // path.resolve(__dirname, `./protocols`)
        ]
    }

    if (!servableConfig.rootProtocolPayload) {
        servableConfig.rootProtocolPayload = {
            type: 'app',
            id: 'app',
            // path: path.resolve(__dirname, "./app")
            path: path.resolve('', 'lib/app')
        }
    }

    if (!servableConfig.rootProtocolPayload.path) {
        servableConfig.rootProtocolPayload = {
            ...servableConfig.rootProtocolPayload,
            path: path.resolve('', 'lib/app')
            // path: path.resolve(__dirname, "./app")
        }
    }

    if (!servableConfig.rootProtocolPayload.id || !servableConfig.rootProtocolPayload.type) {
        servableConfig.rootProtocolPayload = {
            ...servableConfig.rootProtocolPayload,
            id: 'app',
            type: 'app',
        }
    }

    servableConfig.adaptedBasic = true
}