import ServableClass from "../servable"
import createHttpServer from "./httpServer"
import expressApp from "./express"
import seed from "./seed"
import liveServer from "./liveServer"
import registerClasses from "./registerClasses"
import wireSchema from "./wireSchema"
import afterInit from "./afterInit"
import beforeInit from "./beforeInit"
import start from "./start"
import adaptConfig from "../utils/adaptConfig/index.js"
import printEnd from './_messages/end'
import launchSystem from "./launchSystem/index.js"
import { compute } from "../schema"

export default async props => {
  const { servableConfig } = props
  adaptConfig({ servableConfig, })

  global.Servable = new ServableClass(props)

  const _schema = await compute({ servableConfig })
  await launchSystem({ schema: _schema, servableConfig })


  // return
  try {

    const app = expressApp()
    Servable.Express.app = app

    const httpServer = await createHttpServer({ app })
    Servable.httpServer = httpServer

    const serverStruct = await start({ app, servableConfig, schema: _schema })
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

    await beforeInit({ app, schema, configuration, server, servableConfig })
    await registerClasses({ app, schema })
    await wireSchema({ app, schema })
    await liveServer({ app, httpServer, servableConfig })
    await seed({ server, schema, app, httpServer })
    await afterInit({ app, schema, configuration, server, servableConfig })
    /////////////////////////////


    printEnd()
  } catch (e) {
    console.error(e)
  }
}
