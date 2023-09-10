import database from "./database"

export default async (props) => {
  let result = await database(props)
  return result
}