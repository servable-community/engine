
export default class MarkdownWizard {
  _value = null

  append(value) {
    this._value = this._value
      ? `${this._value}\n${value}`
      : `${value}`
  }

  getMarkdown() {
    return this._value
  }
}
