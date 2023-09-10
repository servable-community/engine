import cacheFn from './cache'

export default class ServableExpress {
  _app = null
  _cache = cacheFn

  constructor(props) {
    const { } = props
  }

  get app() { return this._app }
  set app(value) { this._app = value }

  get cache() { return this._cache }
  set cache(value) { this._cache = value }
}