import ServableClass from "../servable"
import createHttpServer from "./httpServer"
import expressApp from "./express"
import seed from "./seed"
import liveServer from "./liveServer"
import registerClasses from "./registerParseSubClasses"
import wireSchema from "./wireSchema"
import afterInit from "./afterInit"
import beforeInit from "./beforeInit"
import start from "./start"
import adaptConfig from "../utils/adaptConfig/index.js"
import printEnd from './_messages/end'
import launchSystem from "./system/index.js"
import { compute } from "../lib/schema"
import config from "./config"

export default async props => {
  const { servableEngineConfig } = props
  adaptConfig({ servableEngineConfig, })

  global.Servable = new ServableClass(props)

  const _schema = await compute({ servableEngineConfig })
  await launchSystem({ schema: _schema, servableEngineConfig })


  // return
  try {

    const app = expressApp()
    Servable.Express.app = app

    const httpServer = await createHttpServer({ app })
    Servable.httpServer = httpServer

    const serverStruct = await start({ app, servableEngineConfig, schema: _schema })
    if (!serverStruct) {
      console.log("Could not create a server")
      return
    }

    const { schema, server, configuration } = serverStruct
    if (configuration.params.skipWiring) {
      console.log("Finished launching a configuration that doesnt require wiring")
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

    const i = await Servable.Config.get('defaultLocale', { locale: "en_US" })
    const a = await Servable.Config.get('defaultLocale', { locale: "en_US", object: null, protocol: { id: 'countryable' } })
    console.log('--------Config:', i)
    printEnd()
  } catch (e) {
    console.error(e)
  }
}