import fs from "fs"

export default async _url => {
  const fileUrl = new URL(_url, import.meta.url)
  const parsedPackageJSON = JSON.parse(await fs.promises.readFile(fileUrl, 'utf8'))
  return parsedPackageJSON
}
