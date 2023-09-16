import targetDockerPath from './targetDockerPath'

export default (props) => {
    return `${targetDockerPath(props)}/docker-compose.yaml`
}
