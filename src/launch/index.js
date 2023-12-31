import ServableClass from "../servable/index.js"
import seed from "./seed/index.js"
import liveServer from "./liveServer/index.js"
import registerClasses from "./registerParseSubClasses/index.js"
import wireSchema from "./wireSchema/index.js"
import afterInit from "./afterInit/index.js"
import beforeInit from "./beforeInit/index.js"
import start from "./start/index.js"
import adaptConfig from "../utils/adaptConfig/index.js"
import printEnd from './_messages/end.js'
import launchSystem from "./system/index.js"
// import { compute } from "../lib/schema/index.js"
import config from "./config/index.js"
// import { computeSchema } from '@servable/manifest'
import { computeSchema } from '../../../manifest/src/index.js'
import mockDocumentation from "./mockDocumentation.js"

export default async props => {
  // const heapDiff = new memwatch.HeapDiff()
  console.log("[Servable]", '[DEBUG]', `launch > entry`,)

  //https://parseplatform.org/Parse-SDK-JS/api/4.3.1/

  try {

    const { servableEngineConfig, adapter: frameworkBridge } = props
    adaptConfig({ servableEngineConfig, frameworkBridge })

    global.Servable = new ServableClass()


    console.log("[Servable]", '[DEBUG]', `Launch > Start`,)

    const app = await frameworkBridge.createApp({ servableEngineConfig })
    await global.Servable.hydrate({ servableEngineConfig, frameworkBridge, app })
    // Servable.Express.app = app
    console.log("[Servable]", '[DEBUG]', `Launch > created an expres app`, Servable.Express.app)

    const staticSchema = await computeSchema({ servableEngineConfig })
    await mockDocumentation({ schema: staticSchema })
    await launchSystem({ schema: staticSchema, servableEngineConfig, frameworkBridge })

    console.log("[Servable]", '[DEBUG]', `servableEngineConfig`, servableEngineConfig)


    const httpServer = await frameworkBridge.createHttpServer({ app })
    Servable.httpServer = httpServer
    console.log("[Servable]", '[DEBUG]', `Launch > created a http server`)



    console.log("[Servable]", '[DEBUG]', `Launch > starting the parse server`)
    const serverStruct = await start({ app, servableEngineConfig, schema: staticSchema, frameworkBridge })
    if (!serverStruct) {
      console.log("[Servable]", '[DEBUG]', `Launch > failed creating the parse server`)
      return
    }

    // await mockDocumentation({ schema: _schema })

    console.log("[Servable]", `Launch > started the parse server`)


    const { schema, server, configuration } = serverStruct
    // console.log('servableEngineConfig', servableEngineConfig, 'serverStruct', serverStruct,)
    console.log('protocols.length>>', schema.protocols.length,)
    // console.log('protocols _schema', _schema.protocols.length, _schema.protocols)

    if (configuration.params.skipWiring) {
      console.log("[Servable]", "Finished launching a configuration that doesnt require wiring")
      return
    }

    Servable.publicUrl = configuration.config.parse.publicServerURL
    console.log("[Servable]", `Launch > set public server url (with mount)`, Servable.publicServerURL)
    /////////////////////////////

    await beforeInit({ app, schema, configuration, server, servableEngineConfig, frameworkBridge })
    await registerClasses({ app, schema, frameworkBridge })
    await wireSchema({ app, schema, frameworkBridge })
    await liveServer({ app, httpServer, servableEngineConfig, frameworkBridge })
    await seed({ server, schema, app, httpServer, configuration, frameworkBridge })
    await config({ server, schema, app, httpServer, configuration, frameworkBridge })
    await afterInit({ app, schema, configuration, server, servableEngineConfig, frameworkBridge })
    /////////////////////////////


    // const i = await Servable.Config.get('defaultLocale', { locale: "en_US" })
    // const a = await Servable.Config.get('defaultLocale', { locale: "en_US", object: null, protocol: { id: 'countryable' } })
    // console.log("[Servable]", '--------Config:', i)
    printEnd()

    Servable.App.Route.define({
      method: Servable.App.Route.Constants.Methods.GET,
      url: '/health-check',
      handler: async () => "Health check passed"
    })
  } catch (e) {
    console.error('[SERVABLE]', 'launch', e)
    Servable.App.Route.define({
      method: Servable.App.Route.Constants.Methods.GET,
      url: '/health-check',
      handler: async (_, response) => {
        response.status(500).send('Server failed')
      }
    })
  }
  finally {
    // const diff = heapDiff.end()
    // console.log('[SERVABLE]', '[DEBUG]', 'launch>heapdiff', diff)
  }
}
