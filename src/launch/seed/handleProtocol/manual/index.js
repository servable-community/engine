export default async (props) => {
    const { item, operationProps } = props
    const { file, } = item

    await file({ ...operationProps })
}