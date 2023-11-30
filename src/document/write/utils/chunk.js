import sanitizePath from 'path-sanitizer'
import fse from 'fs-extra'
import json2md from 'json2md'

export default async ({ chunk, path }) => {
  const {
    payload,
    name,
    id
  } = chunk

  const chunkPath = `/${sanitizePath(`${path}/${id}.md`)}`
  const text = json2md([{ h1: name }, ...payload])
  await fse.outputFile(chunkPath, text)
}
