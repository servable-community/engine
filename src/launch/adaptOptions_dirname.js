import path from "path";
import callerPath from "caller-path";
import { dirname } from "path";

export default ({ servableEngineConfig }) => {
  const __filename = callerPath({ depth: 1 });
  let __dirname = dirname(__filename);
  __dirname = __dirname.split("file://")[1];

  // If (!servableEngineConfig.nodeModulesPath) {
  //     servableEngineConfig.nodeModulesPath = path.resolve(__dirname, `../node_modules`)
  // }

  if (!servableEngineConfig.protocols) {
    servableEngineConfig.protocols = {};
  }

  if (!servableEngineConfig.protocols.local || !servableEngineConfig.protocols.local.length) {
    servableEngineConfig.protocols.local = [path.resolve(__dirname, `./protocols`)];
  }

  if (!servableEngineConfig.rootProtocolPayload) {
    servableEngineConfig.rootProtocolPayload = {
      type: "app",
      id: process.env.SERVABLE_APP_ID,
      path: path.resolve(__dirname, "./app")
    };
  }

  if (!servableEngineConfig.rootProtocolPayload.path) {
    servableEngineConfig.rootProtocolPayload = {
      ...servableEngineConfig.rootProtocolPayload,
      path: path.resolve(__dirname, "./app")
    };
  }

  if (
    !servableEngineConfig.rootProtocolPayload.id ||
    !servableEngineConfig.rootProtocolPayload.type
  ) {
    servableEngineConfig.rootProtocolPayload = {
      ...servableEngineConfig.rootProtocolPayload,
      id: process.env.SERVABLE_APP_ID,
      type: "app"
    };
  }
}
