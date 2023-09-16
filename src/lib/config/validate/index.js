import protocol from "./protocol"

export default async ({ items }) => {
  return Promise.all(items.map(item => protocol({ item })))
}
