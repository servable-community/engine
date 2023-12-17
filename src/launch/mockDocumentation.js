// import { documentProtocol } from '../../../manifest/src/index.js'
// import documentProtocol from '../document/index.js'
// import { documentProtocol } from 'servable-manifest'
// import { generateGithubReadme } from '../../../../../manifest/src/index.js'
import { generateGithubReadme } from 'servable-manifest'

export default async (props) => {

  // await Promise.all([props.schema.protocols[0]].map(async schema => {

  // await Promise.all(props.schema.protocols.map(async (schema, index) => {
  //   if (index === 17) {
  //     const dic = await documentProtocol({
  //       path: schema.loader.path,
  //       write: true
  //     })
  //     console.log(dic)
  //   }
  // }))

  await Promise.all(props.schema.protocols.map(async (schema, index) => {
    if (index === 17) {
      const dic = await generateGithubReadme({
        path: schema.loader.path,
        write: true,
        targetPath: `${schema.loader.path}/README.md`
      })
      console.log(dic)
    }
  }))
}
