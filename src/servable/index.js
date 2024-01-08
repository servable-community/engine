import Messaging from "./messaging/index.js"
import Agenda from "agenda"
import Express from './express/index.js'
import Intercom from './intercom/index.js'

export default class Servable {
  _express = null
  _schema = null
  _httpServer = null
  _servableEngineConfig = null
  _messaging = null
  _config = {}
  _frameworkBridge = null

  get Intercom() { return this._intercom }
  set Intercom(value) { this._intercom = value }

  get Messaging() { return this._messaging }
  set Messaging(value) { this._messaging = value }

  get Express() { return this._express }
  set Express(value) { this._express = value }

  get schema() { return this._schema }
  set schema(value) { this._schema = value }

  get Agenda() { return this._agenda }
  set Agenda(value) { this._agenda = value }

  get Config() { return this._config }
  set Config(value) { this._config = value }

  get frameworkBridge() { return this._frameworkBridge }
  set frameworkBridge(value) { this._frameworkBridge = value }

  constructor() {
    this.App = {}
  }

  async hydrate({ servableEngineConfig, frameworkBridge, app }) {
    this._servableEngineConfig = servableEngineConfig
    this._messaging = new Messaging()
    this._intercom = new Intercom()
    this._agenda = new Agenda()
    this._express = new Express()
    this.frameworkBridge = frameworkBridge
    this.App = await this._frameworkBridge.adaptApp({ servableEngineConfig })
    if (this.App.Route) {
      this.App.Route.Constants = {
        Methods: {
          GET: 'get',
          POST: 'post'
        },
        RateLimiting: {
          Type: {
            FixedByIp: 'fixed-by-ip'
          }
        },
        Cache: {
          Type: {
            InMemory: 'memory'
          }
        }
      }
    }
    // this.AppNative = await this._frameworkBridge.adaptAppNative({ servableEngineConfig: this.servableEngineConfig })
    this.AppNative = app
  }

  toString() {
    return super.toString()
  }

  get appClass() {
    const { appProtocol } = this.schema
    const {
      jsClasses,
      classes: { managed },
    } = appProtocol.schema
    const appClass = jsClasses.filter(a => a.name === 'App')
    return appClass[0]
  }

  set appClass(value) { }
}



// this.App = {
//   ...this._frameworkBridge.appUtils({ servableEngineConfig: this.servableEngineConfig }),
//   Object: this._frameworkBridge.appObject({ servableEngineConfig: this.servableEngineConfig }),
//   Query: this._frameworkBridge.appQuery({ servableEngineConfig: this.servableEngineConfig }),
//   Cloud: this._frameworkBridge.appCloud({ servableEngineConfig: this.servableEngineConfig }),
//   User: this._frameworkBridge.appUser({ servableEngineConfig: this.servableEngineConfig }),
//   Role: this._frameworkBridge.appRole({ servableEngineConfig: this.servableEngineConfig }),
//   Session: this._frameworkBridge.appSession({ servableEngineConfig: this.servableEngineConfig }),
//   // Schema: this._frameworkBridge.appSchema({ servableEngineConfig: this.servableEngineConfig }),
//   // LiveQuery: this._frameworkBridge.appLiveQuery({ servableEngineConfig: this.servableEngineConfig }),
//   Installation: this._frameworkBridge.appInstallation({ servableEngineConfig: this.servableEngineConfig }),
//   Config: this._frameworkBridge.appConfig({ servableEngineConfig: this.servableEngineConfig }),
// }
// this.AppNative = this._frameworkBridge.appNative({ servableEngineConfig: this.servableEngineConfig })
