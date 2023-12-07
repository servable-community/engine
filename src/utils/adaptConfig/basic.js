
import path from 'path'
// import callerPath from 'caller-path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


export default ({ servableEngineConfig }) => {
    if (servableEngineConfig.adaptedBasic) {
        return
    }
    // const __filename = callerPath({ depth: 1 })
    // let __dirname = dirname(__filename)
    // __dirname = __dirname.split('file://')[1]

    // if (!servableEngineConfig.nodeModulesPath) {
    //     servableEngineConfig.nodeModulesPath = path.resolve(__dirname, `../node_modules`)
    // }

    if (!servableEngineConfig.distribution) {
        servableEngineConfig.distribution = {
            enabled: false,
        }
    }

    if (!servableEngineConfig.distribution.databaseURI) {
        servableEngineConfig.distribution.databaseURI = process.env.SERVABLE_UTILS_DATABASE_URI
    }


    if (!servableEngineConfig.system) {
        servableEngineConfig.system = {}
    }

    if (!servableEngineConfig.system.docker) {
        servableEngineConfig.system.docker = {
            enabled: true,
            environments: ['development']
        }
    }

    if (!servableEngineConfig.protocols) {
        servableEngineConfig.protocols = {}
    }

    if (!servableEngineConfig.protocols.local || !servableEngineConfig.protocols.local.length) {
        servableEngineConfig.protocols.local = [
            path.resolve('', 'lib/protocols')
        ]
    }

    servableEngineConfig.protocols.local = [
        path.resolve(__dirname, `../../protocols`),
        ...servableEngineConfig.protocols.local,
    ]

    if (!servableEngineConfig.rootProtocolPayload) {
        servableEngineConfig.rootProtocolPayload = {
            type: 'app',
            id: 'app',
            // path: path.resolve(__dirname, "./app")
            path: path.resolve('', 'lib/app')
        }
    }

    if (!servableEngineConfig.rootProtocolPayload.path) {
        servableEngineConfig.rootProtocolPayload = {
            ...servableEngineConfig.rootProtocolPayload,
            path: path.resolve('', 'lib/app')
            // path: path.resolve(__dirname, "./app")
        }
    }

    if (!servableEngineConfig.rootProtocolPayload.id || !servableEngineConfig.rootProtocolPayload.type) {
        servableEngineConfig.rootProtocolPayload = {
            ...servableEngineConfig.rootProtocolPayload,
            id: 'app',
            type: 'app',
        }
    }

    servableEngineConfig.adaptedBasic = true
}