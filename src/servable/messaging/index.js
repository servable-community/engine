
export default class Messaging {
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
  }

  toString() {
    return super.toString()
  }

  registerSender({
    withTemplate,
    withTemplateCode
  }) {
    this.withTemplate = withTemplate
    this.withTemplateCode = withTemplateCode
  }

  async sendEmailWithTemplateCode(props) {
    return this.withTemplateCode(props)
  }

  async sendEmailWithTemplate(props) {
    return this.withTemplate(props)
  }
}