import registerClass from './registerClass.js'

export default async (props) => {
  const { item,
  } = props

  const { classes: { own } } = item.schema

  return Promise.all(own.map(async _item => {
    await registerClass({
      ...props,
      protocol: item,
      item: _item
    })
  }))
}
