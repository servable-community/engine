import targetDockerPath from './targetDockerPath.js'

export default (props) => {
  return `${targetDockerPath(props)}/docker-compose.yaml`
}
