import targetDockerPath from './targetDockerPath'

export default (props) => {
    return `${targetDockerPath(props)}/data`
}
