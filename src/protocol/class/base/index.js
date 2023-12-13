import semver from 'semver'

const DEFAULT_VERSION = "1.0.0"

export default class Protocol {
  _loader = null
  _id = null
  _type = null
  _extractionStatus = 0
  _targetVersion = DEFAULT_VERSION
  _version = DEFAULT_VERSION
  _loadState = 0
  _module = {}
  _schema = {
    classes: {
      managed: [],
      all: []
    }
  }
  _params = {}
  _requestedVersion = DEFAULT_VERSION
  _name = null
  _slug = null

  constructor(props) {
    const {
      params,
      version: requestedVersion = DEFAULT_VERSION,
      schema,
      name,
      module: sourceModule,
      id,
      type,
      slug }
      = props

    this._schema = schema
    this._id = id
    this._type = type
    this._requestedVersion = requestedVersion
    this._params = params
    this._name = name
    this._slug = slug
  }


  async load({ servableEngineConfig } = {}) {
    switch (this.loadState) {
      case 1: {
        return
      }
      default: break
    }

    this.loadState = 1
    try {
      const module = await this.loader.getModule()
      this.module = module
      this.loadState = 2
    } catch (e) {
      this.loadState = 3
    }

    if (!servableEngineConfig || !servableEngineConfig.versions) {
      return
    }

    if (!servableEngineConfig.versions[this.id]) {
      return
    }

    this.version = servableEngineConfig.versions[this.id]
  }

  get type() {
    return this._type
  }
  set type(value) {
    this._type = value
  }

  get params() {
    return this._params
  }
  set params(value) {
    this._params = value
  }

  get loadState() {
    return this._loadState
  }
  set loadState(value) {
    this._loadState = value
  }

  get module() {
    return this._module
  }

  set module(value) {
    this._module = value
    if (this._module && this._module.version) {
      this.targetVersion = this._module.version
      this.version = this.targetVersion
    }
  }

  get version() {
    return this._version
  }

  set version(value) {
    if (!semver.valid(value)) {
      return
    }
    this._version = semver.clean(value)
  }

  get targetVersion() {
    return this._targetVersion
  }
  set targetVersion(value) {
    if (!semver.valid(value)) {
      return
    }
    this._targetVersion = value
  }

  get loader() {
    return this._loader
  }

  set loader(value) {
    this._loader = value
    this._loader.protocol = this
  }

  get extractionStatus() {
    return this._extractionStatus
  }
  set extractionStatus(value) {
    this._extractionStatus = value
  }

  get schema() {
    return this._schema
  }
  set schema(value) {
    this._schema = value
  }

  get id() {
    return this._id
  }
  set id(value) {
    this._id = value
  }
}
