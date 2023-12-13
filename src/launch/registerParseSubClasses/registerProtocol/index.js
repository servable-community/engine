import registerClass from './registerClass.js'

export default async (props) => {
  const { item,
  } = props

  const { classes: { managed } } = item.schema

  return Promise.all(managed.map(async _item => {
    await registerClass({
      ...props,
      protocol: item,
      item: _item
    })
  }))
}
