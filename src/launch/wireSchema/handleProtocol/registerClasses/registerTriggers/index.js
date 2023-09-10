import * as ProtocolTriggers from './protocols'

export default async ({
    item,
    protocol,
    allProtocols }) => {
    try {
        const { className } = item

        const triggers = await protocol.loader.getClassTriggers({ className })
        if (!triggers) {
            return
        }

        Servable.App.Cloud.beforeSave(className, async (request) => {
            try {
                await ProtocolTriggers.beforeSave({ request, protocol, allProtocols })
                triggers.beforeSave && await triggers.beforeSave({ request, protocol })
            } catch (e) {
                console.error(`[Class ${className}] ⚠️ beforeSave`, e.message)
            }
        })

        Servable.App.Cloud.afterSave(className, async (request) => {
            try {
                await ProtocolTriggers.afterSave({ request, protocol, allProtocols })
                triggers.afterSave && await triggers.afterSave({ request, protocol })
            } catch (e) {
                console.error(`[Class ${className}] ⚠️ afterSave`, e.message)
            }
        })

        Servable.App.Cloud.beforeDelete(className, async (request) => {
            try {
                await ProtocolTriggers.beforeDelete({ request, protocol, allProtocols })
                triggers.beforeDelete && await triggers.beforeDelete({ request, protocol })
            } catch (e) {
                console.error(`[Class ${className}] ⚠️ beforeDelete`, e.message)
            }
        })

        Servable.App.Cloud.afterDelete(className, async (request) => {
            try {
                await ProtocolTriggers.afterDelete({ request, protocol, allProtocols })
                triggers.afterDelete && await triggers.afterDelete({ request, protocol })
            } catch (e) {
                console.error(`[Class ${className}] ⚠️ afterDelete`, e.message)
            }
        })
    }
    catch (e) {
        if (e.code !== 'ERR_MODULE_NOT_FOUND') {
            console.error(e)
        }
    }
}