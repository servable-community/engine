import { ParseServer } from "parse-server"

export default async ({ httpServer, servableEngineConfig }) => {
  // if (!servableEngineConfig.liveQuery || !servableEngineConfig.liveQuery.enabled) {
  //   return
  // }

  ParseServer.createLiveQueryServer(httpServer)
}