// import mockDocumentation from "./mockDocumentation.js"

export default async props => {
  console.log("[Servable]", '[DEBUG]', `launch > entry`,)
  try {

  } catch (e) {
    console.error('[SERVABLE]', 'launch', e)
  }
  finally {
    console.error('[SERVABLE]', 'finish')
  }
}
