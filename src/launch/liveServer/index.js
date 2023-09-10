import { ParseServer } from "parse-server"

export default async ({ httpServer, servableConfig }) => {
  // if (!servableConfig.liveQuery || !servableConfig.liveQuery.enabled) {
  //   return
  // }

  ParseServer.createLiveQueryServer(httpServer)
}