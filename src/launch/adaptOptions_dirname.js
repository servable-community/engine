import path from "path";
import callerPath from "caller-path";
import { dirname } from "path";

export default ({ servableConfig }) => {
  const __filename = callerPath({ depth: 1 });
  let __dirname = dirname(__filename);
  __dirname = __dirname.split("file://")[1];

  // If (!servableConfig.nodeModulesPath) {
  //     servableConfig.nodeModulesPath = path.resolve(__dirname, `../node_modules`)
  // }

  if (!servableConfig.protocols) {
    servableConfig.protocols = {};
  }

  if (!servableConfig.protocols.local || !servableConfig.protocols.local.length) {
    servableConfig.protocols.local = [path.resolve(__dirname, `./protocols`)];
  }

  if (!servableConfig.rootProtocolPayload) {
    servableConfig.rootProtocolPayload = {
      type: "app",
      id: process.env.SERVABLE_APP_ID,
      path: path.resolve(__dirname, "./app")
    };
  }

  if (!servableConfig.rootProtocolPayload.path) {
    servableConfig.rootProtocolPayload = {
      ...servableConfig.rootProtocolPayload,
      path: path.resolve(__dirname, "./app")
    };
  }

  if (
    !servableConfig.rootProtocolPayload.id ||
    !servableConfig.rootProtocolPayload.type
  ) {
    servableConfig.rootProtocolPayload = {
      ...servableConfig.rootProtocolPayload,
      id: process.env.SERVABLE_APP_ID,
      type: "app"
    };
  }
};
