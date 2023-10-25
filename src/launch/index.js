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

export default async props => {
  const { servableEngineConfig } = props
  adaptConfig({ servableEngineConfig, })

  global.Servable = new ServableClass(props)

  const _schema = await compute({ servableEngineConfig })
  await launchSystem({ schema: _schema, servableEngineConfig })

  try {

    const app = expressApp()
    Servable.Express.app = app

    const httpServer = await createHttpServer({ app })
    Servable.httpServer = httpServer

    const serverStruct = await start({ app, servableEngineConfig, schema: _schema })
    if (!serverStruct) {
      console.log("[Servable]", "Could not create a server")
      return
    }

    const { schema, server, configuration } = serverStruct
    if (configuration.params.skipWiring) {
      console.log("[Servable]", "Finished launching a configuration that doesnt require wiring")
      return
    }

    Servable.publicUrl = configuration.config.parse.publicServerURL

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
