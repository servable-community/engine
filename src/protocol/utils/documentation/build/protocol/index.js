import { ProtocolEnum } from "../../../tree/enums.js"
import MarkdownWizard from '../../utils/builder/index.js'
import markdown from 'markdown-builder'
// import append from "../utils/builder/append.js"
import access from '../../../tree/access/index.js'
import documentClass from '../class/index.js'

export default async props => {
  const { path } = props
  const result = {}

  let builder = props.builder
  if (!builder) {
    builder = new MarkdownWizard()
  }
  let extraction = null
  let index = await access({
    item: ProtocolEnum.Index,
    extraction,
    path
  })
  if (index && index.data && index.data.module) {
    const { name, description, id, version } = index.data.module
    builder.append(markdown.headers.h1(name))
    builder.append(markdown.headers.h2(`#${id}`))
    builder.append(`#${version}`)
    builder.append(description)
    builder.append(markdown.misc.hr())
  }

  builder.append(markdown.headers.h2('Protocol class'))
  let classIndex = await access({
    item: ProtocolEnum.Class.Index,
    path
  })
  if (classIndex && classIndex.data) {
    const { astAdapted } = classIndex.data
    if (astAdapted) {
      const { tags, params, description } = astAdapted
      if (astAdapted['servable-description']) {
        builder.append(markdown.headers.h1(astAdapted['servable-description'].description))
      }
      if (astAdapted['servable-how-to']) {
        builder.append(markdown.headers.h1(astAdapted['servable-how-to'].description))
      }
    }
  }

  builder.append(markdown.headers.h2('Live classes'))
  const liveClasses = await access({
    item: ProtocolEnum.LiveClasses,
    path
  })
  if (liveClasses && liveClasses.data) {

  }

  builder.append(markdown.headers.h2('Schema'))
  const schema = await access({
    item: ProtocolEnum.Schema,
    path
  })
  if (schema && schema.data) {

  }

  builder.append(markdown.headers.h2('Seed'))
  const seed = await access({
    item: ProtocolEnum.Seed.Index,
    path
  })
  if (seed && seed.data) {
    const { astAdapted } = seed.data
    if (astAdapted) {
    }
  }

  builder.append(markdown.headers.h2('Before init'))
  const beforeInit = await access({
    item: ProtocolEnum.Config,
    path
  })
  if (beforeInit && beforeInit.data) {
    const { astAdapted } = beforeInit.data
    if (astAdapted) {
    }
  }

  builder.append(markdown.headers.h2('After init'))
  const afterInit = await access({
    item: ProtocolEnum.Config,
    path
  })
  if (afterInit && afterInit.data) {
    const { astAdapted } = afterInit.data
    if (astAdapted) {
    }
  }

  builder.append(markdown.headers.h2('Functions'))
  const functions = await access({
    item: ProtocolEnum.Config,
    path
  })
  if (functions && functions.data) {
    const { astAdapted } = functions.data
    if (astAdapted) {
    }
  }

  builder.append(markdown.headers.h2('Config'))
  const config = await access({
    item: ProtocolEnum.Config,
    path
  })
  if (config && config.data) {
    const { astAdapted } = config.data
    if (astAdapted) {
    }
  }

  builder.append(markdown.headers.h2('System'))
  const system = await access({
    item: ProtocolEnum.System,
    path
  })
  if (system && system.data) {
    const { astAdapted } = system.data
    if (astAdapted) {
    }
  }

  builder.append(markdown.headers.h2('Classes'))
  const _classes = await access({
    item: ProtocolEnum.Classes,
    path
  })

  let classes = null
  if (_classes && _classes.children) {
    classes = await Promise.all(_classes.children.map(async _class => documentClass({
      path: _class.fullPath
    })))
  }

  const protocol = builder.getMarkdown()
  return {
    protocol,
    classes
  }

  // const liveClasses = await access({
  //   item: ProtocolEnum.LiveClasses,
  //   path: schema.loader.path
  // })




}
