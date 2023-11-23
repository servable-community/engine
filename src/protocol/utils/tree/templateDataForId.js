import classes from './data/class.js'
import protocol from './data/protocol.js'

export default (id) => {
  switch (id) {
    case 'classes': {
      return classes
    }
    case 'protocol': {
      return protocol
    }
    default: return null
  }
}
