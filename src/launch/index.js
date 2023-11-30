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
// import documentProtocol from '../protocol/utils/documentation/index.js'

export default async props => {
  const { servableEngineConfig } = props
  adaptConfig({ servableEngineConfig, })

  global.Servable = new ServableClass()
  global.Servable.hydrate(props)

  const _schema = await compute({ servableEngineConfig })
  await launchSystem({ schema: _schema, servableEngineConfig })

  try {

    console.log("[Servable]", `Launch > Start`)
    const app = expressApp()
    Servable.Express.app = app
    console.log("[Servable]", `Launch > created an expres app`)
    const httpServer = await createHttpServer({ app })
    Servable.httpServer = httpServer
    console.log("[Servable]", `Launch > created a http server`)

    console.log("[Servable]", `Launch > starting the parse server`)
    const serverStruct = await start({ app, servableEngineConfig, schema: _schema })
    if (!serverStruct) {
      console.log("[Servable]", `Launch > failed creating the parse server`)
      return
    }

    // // await Promise.all([_schema.protocols[0]].map(async schema => {
    // await Promise.all(_schema.protocols.map(async (schema, index) => {
    //   if (index === 17) {
    //     const dic = await documentProtocol({
    //       path: schema.loader.path,
    //       write: true
    //     })
    //     console.log(dic)
    //   }
    // }))

    console.log("[Servable]", `Launch > started the parse server`)

    const { schema, server, configuration } = serverStruct
    if (configuration.params.skipWiring) {
      console.log("[Servable]", "Finished launching a configuration that doesnt require wiring")
      return
    }

    Servable.publicUrl = configuration.config.parse.publicServerURL
    console.log("[Servable]", `Launch > set public server url`, Servable.publicServerURL)
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
  } catch (e) {
    console.error(e)
  }
}
