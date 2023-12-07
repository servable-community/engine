import { ParseServer } from "parse-server"

export default async ({ httpServer, servableEngineConfig }) => {
  // if (!servableEngineConfig.liveQuery || !servableEngineConfig.liveQuery.enabled) {
  //   return
  // }
  // try {
  console.log("[Servable]", `Launch > Live query > Start`)
  ParseServer.createLiveQueryServer(httpServer)
  console.log("[Servable]", `Launch > Live query > Success`)
  // } catch (e) {
  //   console.log("[Servable]", `Launch > Live query 🚀 > Error`)
  //   console.error(e)
  // }
}
