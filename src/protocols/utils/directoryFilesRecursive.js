import checkFileExists from './checkFileExists'
import fs from 'fs'
import _path from 'path'
import _ from 'underscore'
//https://www.npmjs.com/package/directory-import


const perform = async ({ path }) => {
    try {
        if (!(await checkFileExists(path))) {
            return null
        }

        const items = await fs.promises.readdir(path)

        if (!items || !items.length) {
            return null
        }

        let results = (await Promise.all(items.map(async item => {
            if (item.includes('spec.js')) {
                return null
            }

            const __path = _path.join(path, item)

            const _stat = await fs.promises.stat(__path)
            if (!_stat) {
                return null
            }

            const isDir = _stat.isDirectory()
            if (isDir) {
                return perform({ path: __path })
            }

            if (!(await checkFileExists(__path))) {
                return null
            }

            return [(await import(__path))]
        }))).filter(a => a)

        results = _.flatten(results)
        return results
    }
    catch (e) {
        console.error(e)
        return null
    }
}


export default perform