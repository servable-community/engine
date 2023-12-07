import path from 'path'

export default (props) => {
    const {
        item,
    } = props

    return path.resolve('', `.system/${item.id}/docker`)
}
