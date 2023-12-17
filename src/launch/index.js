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
import { computeSchema } from 'servable-manifest'
// import { computeSchema } from '../../../../../manifest/src/index.js'
import mockDocumentation from "./mockDocumentation.js"

export default async props => {
  // const heapDiff = new memwatch.HeapDiff()
  console.log("[Servable]", '[DEBUG]', `launch > entry`,)


  try {

    const { servableEngineConfig, adapter: frameworkAdapter } = props
    adaptConfig({ servableEngineConfig, frameworkAdapter })

    global.Servable = new ServableClass()
    await global.Servable.hydrate({ servableEngineConfig })

    console.log("[Servable]", '[DEBUG]', `Launch > Start`,)

    const app = await frameworkAdapter.createApp({ servableEngineConfig })

    // Servable.Express.app = app
    console.log("[Servable]", '[DEBUG]', `Launch > created an expres app`, Servable.Express.app)

    const staticSchema = await computeSchema({ servableEngineConfig })
    await mockDocumentation({ schema: staticSchema })
    await launchSystem({ schema: staticSchema, servableEngineConfig, frameworkAdapter })

    console.log("[Servable]", '[DEBUG]', `servableEngineConfig`, servableEngineConfig)


    const httpServer = await frameworkAdapter.createHttpServer({ app })
    Servable.httpServer = httpServer
    console.log("[Servable]", '[DEBUG]', `Launch > created a http server`)



    console.log("[Servable]", '[DEBUG]', `Launch > starting the parse server`)
    const serverStruct = await start({ app, servableEngineConfig, schema: staticSchema, frameworkAdapter })
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

    await beforeInit({ app, schema, configuration, server, servableEngineConfig, frameworkAdapter })
    await registerClasses({ app, schema, frameworkAdapter })
    await wireSchema({ app, schema, frameworkAdapter })
    await liveServer({ app, httpServer, servableEngineConfig, frameworkAdapter })
    await seed({ server, schema, app, httpServer, configuration, frameworkAdapter })
    await config({ server, schema, app, httpServer, configuration, frameworkAdapter })
    await afterInit({ app, schema, configuration, server, servableEngineConfig, frameworkAdapter })
    /////////////////////////////


    // const i = await Servable.Config.get('defaultLocale', { locale: "en_US" })
    // const a = await Servable.Config.get('defaultLocale', { locale: "en_US", object: null, protocol: { id: 'countryable' } })
    // console.log("[Servable]", '--------Config:', i)
    printEnd()


    app.get('/health-check', (req, res) => {
      res.send("Health check passed");
    })

  } catch (e) {
    console.error('[SERVABLE]', 'launch', e)
    app.get('/health-check', (req, res) => {
      res.status(500).send('Server failed')
    })
  }
  finally {
    // const diff = heapDiff.end()
    // console.log('[SERVABLE]', '[DEBUG]', 'launch>heapdiff', diff)
  }
}
