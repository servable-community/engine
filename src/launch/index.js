import ServableClass from "../servable/index.js"
import createHttpServer from "./httpServer/index.js"
import expressApp from "./express/index.js"
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
import { compute } from "../lib/schema/index.js"
import config from "./config/index.js"

// import mockDocumentation from "./mockDocumentation.js"
// import memwatch from 'node-memwatch-x'
// import mockmemwatch from "./mockmemwatch.js"
// mockmemwatch()

export default async props => {
  // const heapDiff = new memwatch.HeapDiff()
  console.log("[Servable]", '[DEBUG]', `launch > entry`,)
  const app = expressApp()

  try {

    const { servableEngineConfig } = props
    adaptConfig({ servableEngineConfig, })

    global.Servable = new ServableClass()
    await global.Servable.hydrate({ servableEngineConfig })

    console.log("[Servable]", '[DEBUG]', `Launch > Start`,)



    Servable.Express.app = app
    console.log("[Servable]", '[DEBUG]', `Launch > created an expres app`, Servable.Express.app)

    const _schema = await compute({ servableEngineConfig })
    await launchSystem({ schema: _schema, servableEngineConfig })

    console.log("[Servable]", '[DEBUG]', `servableEngineConfig`, servableEngineConfig)


    const httpServer = await createHttpServer({ app })
    Servable.httpServer = httpServer
    console.log("[Servable]", '[DEBUG]', `Launch > created a http server`)



    console.log("[Servable]", '[DEBUG]', `Launch > starting the parse server`)
    const serverStruct = await start({ app, servableEngineConfig, schema: _schema })
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

    await beforeInit({ app, schema, configuration, server, servableEngineConfig })
    await registerClasses({ app, schema })
    await wireSchema({ app, schema })
    await liveServer({ app, httpServer, servableEngineConfig })
    await seed({ server, schema, app, httpServer, configuration })
    await config({ server, schema, app, httpServer, configuration })
    await afterInit({ app, schema, configuration, server, servableEngineConfig })
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
