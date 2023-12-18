import Messaging from "./messaging/index.js"
import Agenda from "agenda"
import Express from './express/index.js'


export default class Servable {
  _express = null
  _schema = null
  _httpServer = null
  _servableEngineConfig = null
  _messaging = null
  _config = {}
  _frameworkAdapter = null

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

  get frameworkAdapter() { return this._frameworkAdapter }
  set frameworkAdapter(value) {
    this._frameworkAdapter = value
  }

  constructor() {
    this.App = {}
  }

  async hydrate({ servableEngineConfig, frameworkAdapter }) {
    this._servableEngineConfig = servableEngineConfig
    this._messaging = new Messaging()
    this._agenda = new Agenda()
    this._express = new Express()
    this.frameworkAdapter = frameworkAdapter
    this.App = await this._frameworkAdapter.adaptApp({ servableEngineConfig: this.servableEngineConfig })
    this.AppNative = await this._frameworkAdapter.adaptAppNative({ servableEngineConfig: this.servableEngineConfig })
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
//   ...this._frameworkAdapter.appUtils({ servableEngineConfig: this.servableEngineConfig }),
//   Object: this._frameworkAdapter.appObject({ servableEngineConfig: this.servableEngineConfig }),
//   Query: this._frameworkAdapter.appQuery({ servableEngineConfig: this.servableEngineConfig }),
//   Cloud: this._frameworkAdapter.appCloud({ servableEngineConfig: this.servableEngineConfig }),
//   User: this._frameworkAdapter.appUser({ servableEngineConfig: this.servableEngineConfig }),
//   Role: this._frameworkAdapter.appRole({ servableEngineConfig: this.servableEngineConfig }),
//   Session: this._frameworkAdapter.appSession({ servableEngineConfig: this.servableEngineConfig }),
//   // Schema: this._frameworkAdapter.appSchema({ servableEngineConfig: this.servableEngineConfig }),
//   // LiveQuery: this._frameworkAdapter.appLiveQuery({ servableEngineConfig: this.servableEngineConfig }),
//   Installation: this._frameworkAdapter.appInstallation({ servableEngineConfig: this.servableEngineConfig }),
//   Config: this._frameworkAdapter.appConfig({ servableEngineConfig: this.servableEngineConfig }),
// }
// this.AppNative = this._frameworkAdapter.appNative({ servableEngineConfig: this.servableEngineConfig })
