import createHttpServer from "./httpServer/index.js"
import expressApp from "./express/index.js"

export default async props => {
  // const heapDiff = new memwatch.HeapDiff()
  console.log("[Servable]", '[DEBUG]', `launch > entry`,)
  try {
    const app = expressApp()
    app.get('/health-check', (req, res) => {
      res.send("Health check passed");
    });
    app.get('/bad-health', (req, res) => {
      res.status(500).send('Health check did not pass');
    });
    const httpServer = await createHttpServer({ app })
    console.log("[Servable]", '[DEBUG]', `Launch > created an expres app`,)
    // app,
    // httpServer)
  } catch (e) {
    console.error('[SERVABLE]', 'launch', e)
  }
  finally {
    // const diff = heapDiff.end()
    // console.log('[SERVABLE]', '[DEBUG]', 'launch>heapdiff', diff)
  }
}
