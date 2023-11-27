import { ProtocolEnum, ClassEnum, DataTemplateType } from "../protocol/utils/tree/enums.js"

export default async props => {

  const ccs = []
  // await Promise.all([_schema.protocols[0]].map(async schema => {
  await Promise.all(_schema.protocols.map(async schema => {
    try {
      // const manifest = await access({
      //   item: ProtocolEnum.Manifest,
      //   path: schema.loader.path
      // })

      // const liveClasses = await access({
      //   item: ProtocolEnum.LiveClasses,
      //   path: schema.loader.path
      // })

      // const classIndex = await access({
      //   item: ProtocolEnum.Class.Index,
      //   path: schema.loader.path
      // })

      const classes = await access({
        item: ProtocolEnum.Classes,
        path: schema.loader.path
      })
      ccs.push(classes)
      // if (classes.children && classes.children.length) {
      //   const classA = classes.children[0]
      //   const classAClass = await access({
      //     item: ClassEnum.Class,
      //     path: classA.fullPath,
      //     type: DataTemplateType.Class
      //   })
      //   const classAClassIndex = await access({
      //     item: ClassEnum.Class.Index,
      //     path: classA.fullPath,
      //     type: DataTemplateType.Class
      //   })
      //   console.log(classA)
      // }

      // const functions = await access({
      //   item: ProtocolEnum.Functions,
      //   path: schema.loader.path
      // })
      // let schemas = await access({
      //   item: ProtocolEnum.Schema,
      //   path: schema.loader.path
      // })
      // if (schemas && schemas.length) {

      // }
      // const __schema = await access({
      //   item: ClassEnum.Schema,
      //   path: schema.loader.path
      // })
    } catch (ee) {
      console.error(ee)
    }
  }))

  await Promise.all(ccs.map(async cc => {
    if (!ccs || !ccs.children) {
      return
    }
    await Promise.all(cc.children.map(async classA => {
      try {


        // const classAClass = await access({
        //   item: ClassEnum.Class,
        //   path: classA.fullPath,
        //   type: DataTemplateType.Class
        // })
        const classAClassIndex = await access({
          item: ClassEnum.Class.Index,
          path: classA.fullPath,
          type: DataTemplateType.Class
        })
        const classASeedExecutor = await access({
          item: ClassEnum.Seed.Executor,
          path: classA.fullPath,
          type: DataTemplateType.Class
        })
        const classASeedRef = await access({
          item: ClassEnum.Seed.Ref,
          path: classA.fullPath,
          type: DataTemplateType.Class
        })

        // const classAClassIndex = await access({
        //   item: ClassEnum.,
        //   path: classA.fullPath,
        //   type: DataTemplateType.Class
        // })
        console.log('classA', classA, 'classAClassIndex', classAClassIndex, 'classASeedRef', classASeedRef)
      } catch (ee) {
        console.error(ee)
      }
    }))
  }))
}
