import sharp from 'sharp'

/**
* @description Transforms a local image file into a data payload
* @param path Path to file
*/
export default async (props) => {
  const {
    path,
    input,
    width = 600,
    height = 200,
    maxWidth,
    maxHeight,
    quality = 90,
    mimeType
  } = props

  try {
    const buffer = await sharp(input ? input : path)
      .resize(width, height)
      .webp({ quality })
      .toBuffer({ resolveWithObject: true })

    if (!buffer || !buffer.data) {
      return null
    }

    const data = { base64: `${buildPrefix(mimeType)},${buffer.data.toString("base64")}` }
    return data
  } catch (e) {
    console.error(e)
  }
  return null
}

const buildPrefix = mimeType => {
  return `data:${mimeType};base64`
}
