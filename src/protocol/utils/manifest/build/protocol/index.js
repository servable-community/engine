import { ProtocolEnum } from "../../../tree/enums.js"
import MarkdownWizard from '../../utils/builder/index.js'
import markdown from 'markdown-builder'
// import append from "../utils/builder/append.js"
import access from '../../../tree/access/index.js'
import extractAst from '../../utils/extractAst.js'
import documentClass from '../class/index.js'

export default async props => {
  const { path } = props
  let builder = props.builder
  if (!builder) {
    builder = new MarkdownWizard()
  }

  let manifest = await access({
    item: ProtocolEnum.Index,
    path
  })
  if (manifest && manifest.data) {
    const { name, description, id, version } = manifest.data.module
    builder.append(markdown.headers.h1(name))
    builder.append(markdown.headers.h2(`#${id}`))
    builder.append(`#${version}`)
    builder.append(description)
    builder.append(markdown.misc.hr())
  }

  let classIndex = await access({
    item: ProtocolEnum.Class.Index,
    path
  })
  if (classIndex && classIndex.data) {
    const { ast } = classIndex.data
    const extractedAst = extractAst({ ast })

    if (extractedAst) {
      const { tags, params, description } = extractedAst
      if (extractedAst['servable-description']) {
        builder.append(markdown.headers.h1(extractedAst['servable-description'].description))
      }
      if (extractedAst['servable-how-to']) {
        builder.append(markdown.headers.h1(extractedAst['servable-how-to'].description))
      }
    }
  }

  const liveClasses = await access({
    item: ProtocolEnum.LiveClasses,
    path
  })
  if (liveClasses && liveClasses.data) {
    const { ast } = liveClasses.data
    if (ast) {
      builder.append(markdown.headers.h1('ast'))
    }
  }

  const schema = await access({
    item: ProtocolEnum.Schema,
    path
  })
  if (schema && schema.data) {
    const { ast } = schema.data
    if (ast) {
      builder.append(markdown.headers.h1('ast'))
    }
  }

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
