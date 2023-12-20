import categories from './categories.js'

export default class Intercom {
  _sender = null
  _app = null
  _httpServer = null
  _servableEngineConfig = null

  get sender() { return this._sender }
  set sender(value) { this._sender = value }

  constructor() {
    // this._app = app
    // this._httpServer = httpServer
    // this._servableEngineConfig = servableEngineConfig
    const t = categories.Messaging
  }

  register({
    category,

  }) {

  }
}
