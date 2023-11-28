import { ClassEnum, DataTemplateType } from "../../../tree/enums.js"
import MarkdownWizard from '../../utils/builder/index.js'
import markdown from 'markdown-builder'
// import append from "../utils/builder/append.js"
import access from '../../../tree/access/index.js'
import extractAst from '../../utils/extractAst.js'

export default async props => {
  const { path } = props
  let builder = props.builder
  if (!builder) {
    builder = new MarkdownWizard()
  }

  // const classAClass = await access({
  //   item: ClassEnum.Class,
  //   path: classA.fullPath,
  //   type: DataTemplateType.Class
  // })
  const classIndex = await access({
    item: ClassEnum.Class.Index,
    path,
    type: DataTemplateType.Class
  })

  if (classIndex && classIndex.data) {
    const { ast } = classIndex.data
    const extractedAst = extractAst({ ast })

    if (extractedAst) {
      const { tags, params, description } = extractedAst
      // if (extractedAst['servable-description']) {
      builder.append(markdown.headers.h1('Class'))
      builder.append(description)
      // }
      if (extractedAst['servable-how-to']) {
        builder.append(markdown.headers.h1(extractedAst['servable-how-to'].description))
      }
    }
  }

  const result = builder.getMarkdown()
  return result

  // const classASeedExecutor = await access({
  //   item: ClassEnum.Seed.Executor,
  //   path: classA.fullPath,
  //   type: DataTemplateType.Class
  // })

  // const classASeedRef = await access({
  //   item: ClassEnum.Seed.Ref,
  //   path: classA.fullPath,
  //   type: DataTemplateType.Class
  // })

  // const classAClassIndex = await access({
  //   item: ClassEnum.,
  //   path: classA.fullPath,
  //   type: DataTemplateType.Class
  // })
  // console.log('classA', classA, 'classAClassIndex', classAClassIndex, 'classASeedRef', classASeedRef)

}
