import registerFile from './registerFile.js'

export default async ({ files, prefix }) => {
  try {
    if (!files) {
      return
    }

    await Promise.all(files.map(async file => registerFile({ file, prefix })))
  }
  catch (e) {
    console.error(e)
  }
}
