import Messaging from "./messaging"
import _parse from './parse'
import Agenda from "agenda"
import Express from './express'

export default class Servable {
  _express = null
  _schema = null
  _httpServer = null
  _servableEngineConfig = null
  _messaging = null
  _config = {}

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

  constructor(props) {
    const { app, httpServer, servableEngineConfig } = props
    this._express = app
    this._httpServer = httpServer
    this._servableEngineConfig = servableEngineConfig
    this._messaging = new Messaging(props)
    this._agenda = new Agenda(props)
    this._express = new Express(props)
    this.App = {
      ...Parse,
      ..._parse
    }
  }

  toString() {
    return super.toString()
  }

  get appClass() {
    const { appProtocol } = this.schema
    const {
      jsClasses,
      classes: { own },
    } = appProtocol.schema
    const appClass = jsClasses.filter(a => a.name === 'App')
    return appClass[0]
  }

  set appClass(value) { }
}