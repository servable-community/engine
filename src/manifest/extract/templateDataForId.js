import class_ from '../data/class.js'
import protocol from '../data/protocol.js'
import schema from '../data/schema.js'
import { DataTemplateType } from '../enums.js'

export default (id) => {
  switch (id) {
    case DataTemplateType.Class: {
      return class_
    }
    case DataTemplateType.Schema: {
      return schema
    }
    case DataTemplateType.Protocol: {
      return protocol
    }
    default:
      return null
  }
}
