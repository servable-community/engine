import http from "http"

export default async ({ app }) => {
  return new Promise((resolve, reject) => {
    try {
      const port = process.env.SERVER_PORT || 1337
      const httpServer = http.createServer(app)

      httpServer.listen(port, async () => {
        console.info(
          `-- 🚀 😇  ${process.env.SERVABLE_APP_NAME} is running on port " + ${process.env.SERVER_PORT} + " 😍 🚀 .`
        )
        console.info("---------------------------------------------------")
        resolve(httpServer)
      })
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}
