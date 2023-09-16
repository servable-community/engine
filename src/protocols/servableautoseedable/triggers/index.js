import setup from "../lib/setup"
import completeSetup from "../lib/completeSetup"
import tearDown from "../lib/tearDown"

export const afterDelete = async ({ request }) => {
    const { object } = request
    await tearDown({ object })
}

export const beforeSave = async ({ request }) => {
    const { object, context, user, } = request
    const { seedFillMode } = context
    // console.log('seed', seedFillMode)
    // switch (seedFillMode) {
    //     case 'auto': break
    //     default: {
    //         object.set('seedFillMode', 'manual')
    //     } break
    // }

    await setup({ object })
}

export const afterSave = async ({ request }) => {
    const { object } = request
    await completeSetup({ object })
}
