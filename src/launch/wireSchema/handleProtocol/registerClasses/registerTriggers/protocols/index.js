import execute from './execute'

export const beforeSave = async ({ request, allProtocols, protocol }) => {
    const { object } = request
    let dirtyKeys = object.dirtyKeys()
    dirtyKeys = dirtyKeys ? dirtyKeys : []
    request.context.dirtyKeys = dirtyKeys

    await execute({
        allProtocols,
        protocol,
        request,
        operationName: 'beforeSave'
    })
}

export const afterSave = async ({ request, allProtocols, protocol, }) => {
    await execute({
        allProtocols,
        protocol,
        request,
        operationName: 'afterSave'
    })
}

export const beforeDelete = async ({ request, allProtocols, protocol, }) => {
    await execute({
        allProtocols,
        protocol,
        request,
        operationName: 'beforeDelete'
    })
}

export const afterDelete = async ({ request, allProtocols, protocol, }) => {
    await execute({
        allProtocols,
        protocol,
        request,
        operationName: 'afterDelete'
    })
}