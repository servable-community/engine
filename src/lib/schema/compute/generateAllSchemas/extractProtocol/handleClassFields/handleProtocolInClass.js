import preserveMostRestricted from './preserveMostRestricted.js'

export default async (props) => {
  const { item, protocol } = props
  let _item = { ...item }
  try {
    const _fields = await protocol.loader.schemaFields()
    if (_fields) {
      _item.fields = {
        ..._item.fields,
        ..._fields
      }
    }

    const _indexes = await protocol.loader.schemaIndexes()
    if (_indexes) {
      _item.indexes = {
        ..._item.indexes,
        ..._indexes
      }
    }

    const _classLevelPermissions = await protocol.loader.schemaClassLevelPermissions()
    if (_classLevelPermissions) {
      const __classLevelPermissions = preserveMostRestricted([_item.classLevelPermissions, _classLevelPermissions])
      _item.classLevelPermissions = __classLevelPermissions
    }
  } catch (e) {
    console.error(e)
  }

  return _item
}
