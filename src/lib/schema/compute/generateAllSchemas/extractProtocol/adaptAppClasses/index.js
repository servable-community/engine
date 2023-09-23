import importJSONAsync from '../../../../../../utils/importJSONAsync.js'

export default async (props) => {
  const {
    classes,
  } = props

  if (!classes || !classes.length) {
    return
  }

  let ServableApp = classes.filter(a => a.className === 'ServableApp')
  if (!ServableApp || !ServableApp.length) {
    ServableApp = await importJSONAsync('./payloads/classes/ServableApp.json')
    classes.push(ServableApp)
  }

  let _User = classes.filter(a => a.className === '_User')
  if (!_User || !_User.length) {
    _User = await importJSONAsync('./payloads/classes/_User.json')
    classes.push(_User)
  }

  let _Session = classes.filter(a => a.className === '_Session')
  if (!_Session || !_Session.length) {
    _Session = await importJSONAsync('./payloads/classes/_Session.json')
    classes.push(_Session)
  }

  let _Role = classes.filter(a => a.className === '_Role')
  if (!_Role || !_Role.length) {
    _Role = await importJSONAsync('./payloads/classes/_Role.json')
    classes.push(_Role)
  }
}

