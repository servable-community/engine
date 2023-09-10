import Base from '../base'
import checkFileExists from '../../../utils/checkFileExists'
import fs from 'fs'
import directoryFilesRecursive from '../../../utils/directoryFilesRecursive'
import directories from '../../../utils/directories'
import cleanProtocols from '../../../../utils/cleanProtocols'


export default class ProtocolLoaderLocal extends Base {
    _path = null
    _protocol = null

    constructor(props) {
        super(props)
        const { path, extraClasses } = props
        this._path = path
        this._extraClasses = extraClasses
    }

    get path() { return this._path }
    set path(value) { this._path = value }

    get cache() { return this._cache }
    set cache(value) { this._cache = value }

    async isValid() {
        const _stat = await fs.promises.stat(this.path)
        if (!_stat || !_stat.isDirectory()) {
            return false
        }
        return true
    }

    getValueInCache(value) { return this.cache[value] }



    async getClass({ className }) {
        const cacheKey = 'class'
        if (this.getValueInCache(cacheKey)) {
            return this.getValueInCache(cacheKey)
        }

        const path = `${this.path}/classes/${className}/class/index.js`
        if (!(await checkFileExists(path))) {
            const externalClassesPath = `${this.path}/classes/external`
            if (!(await checkFileExists(externalClassesPath))) {
                return null
            }
            const data = (await import(externalClassesPath)).default
            if (!data) {
                return null
            }
            return data[className]
        }

        const data = (await import(path)).default
        //this.cache[cacheKey] = data
        return data
    }

    async getClassCloudCode({ className }) {
        const cacheKey = 'classCloudCode'
        if (this.getValueInCache(cacheKey)) {
            return this.getValueInCache(cacheKey)
        }

        let path = `${this.path}/classes/${className}/functions`
        if (!(await checkFileExists(path))) {
            path = `${this.path}/classes/${className}/cloudCode`
            if (!(await checkFileExists(path))) {
                return null
            }
        }

        const data = (await directoryFilesRecursive({ path }))
        //this.cache[cacheKey] = data
        return data
    }

    async getClassTriggers({ className }) {
        const cacheKey = 'classTriggers'
        if (this.getValueInCache(cacheKey)) {
            return this.getValueInCache(cacheKey)
        }

        const path = `${this.path}/classes/${className}/triggers/index.js`
        if (!(await checkFileExists(path))) {
            return null
        }

        const data = (await import(path))
        //this.cache[cacheKey] = data
        return data
    }

    async getClassJobs({ className }) {
        const cacheKey = 'classJobs'
        if (this.getValueInCache(cacheKey)) {
            return this.getValueInCache(cacheKey)
        }

        const path = `${this.path}/classes/${className}/jobs`
        if (!(await checkFileExists(path))) {
            return null
        }

        const data = (await directoryFilesRecursive({ path }))
        //this.cache[cacheKey] = data
        return data
    }

    async getClassSeed({ className }) {
        const cacheKey = 'classSeed'
        if (this.getValueInCache(cacheKey)) {
            return this.getValueInCache(cacheKey)
        }

        const path = `${this.path}/classes/${className}/seed/index.js`
        if (!(await checkFileExists(path))) {
            return null
        }

        const data = (await import(path)).default
        //this.cache[cacheKey] = data
        return data
    }

    async getClassSeedMetadata({ className }) {
        const cacheKey = 'classSeedMetadata'
        if (this.getValueInCache(cacheKey)) {
            return this.getValueInCache(cacheKey)
        }

        const path = `${this.path}/classes/${className}/seed/metadata.json`
        if (!(await checkFileExists(path))) {
            return null
        }

        const data = (await import(path, {
            assert: { type: "json" },
        })).default
        //this.cache[cacheKey] = data
        return data
    }

    async afterInit() {
        const cacheKey = 'afterInit'
        if (this.getValueInCache(cacheKey)) {
            return this.getValueInCache(cacheKey)
        }

        const path = `${this.path}/afterInit/index.js`
        if (!(await checkFileExists(path))) {
            return null
        }

        const data = (await import(path)).default
        //this.cache[cacheKey] = data
        return data
    }

    async beforeInit() {
        const cacheKey = 'beforeInit'
        if (this.getValueInCache(cacheKey)) {
            return this.getValueInCache(cacheKey)
        }

        const path = `${this.path}/beforeInit/index.js`
        if (!(await checkFileExists(path))) {
            return null
        }

        const data = (await import(path)).default
        //this.cache[cacheKey] = data
        return data
    }

    async seed() {
        const cacheKey = 'seed'
        if (this.getValueInCache(cacheKey)) {
            return this.getValueInCache(cacheKey)
        }

        const path = `${this.path}/seed/index.js`
        if (!(await checkFileExists(path))) {
            return null
        }

        const data = (await import(path)).default
        //this.cache[cacheKey] = data
        return data
    }

    async seedMetadata() {
        const cacheKey = 'seedMetadata'
        if (this.getValueInCache(cacheKey)) {
            return this.getValueInCache(cacheKey)
        }

        const path = `${this.path}/seed/metdata.json`
        if (!(await checkFileExists(path))) {
            return null
        }

        const data = (await import(path, {
            assert: { type: "json" },
        })).default
        //this.cache[cacheKey] = data
        return data
    }

    async cloudCode() {

    }

    async triggers() {
        const cacheKey = 'triggers'
        if (this.getValueInCache(cacheKey)) {
            return this.getValueInCache(cacheKey)
        }

        const path = `${this.path}/triggers/index.js`
        if (!(await checkFileExists(path))) {
            return null
        }

        const data = (await import(path))
        // this.cache[cacheKey] = data
        return data
    }

    async triggersMetadata() {
        const cacheKey = 'triggersMetadata'
        if (this.getValueInCache(cacheKey)) {
            return this.getValueInCache(cacheKey)
        }

        const path = `${this.path}/triggers/metadata.json`
        if (!(await checkFileExists(path))) {
            return null
        }

        const data = (await import(path, {
            assert: { type: "json" },
        })).default
        this.cache[cacheKey] = data
        return data
    }

    async getModule() {
        const cacheKey = 'module'
        if (this.getValueInCache(cacheKey)) {
            return this.getValueInCache(cacheKey)
        }

        let path = `${this.path}/manifest.json`
        if (!(await checkFileExists(path))) {
            path = `${this.path}/module.json`
            if (!(await checkFileExists(path))) {
                return null
            }
        }

        const data = (await import(path, {
            assert: { type: "json" },
        })).default
        this.cache[cacheKey] = data
        return data
    }


    async schemaClasses(props) {
        // if (this.getValueInCache('classes')) {
        //     return this.getValueInCache('classes')
        // }
        const schemaPath = await this._schemaPath()
        let path = `${schemaPath}/classes.js`

        if ((await checkFileExists(path))) {
            const classes = await (await import(path)).default({ protocol: this.protocol })
            // this.cache['classes'] = classes
            return classes
        }

        path = `${schemaPath}/classes.json`
        if (!(await checkFileExists(path))) {
            return []
        }

        const classes = (await import(path, {
            assert: { type: "json" },
        })).default
        // this.cache['classes'] = classes
        return classes
    }

    async schemaFields(props) {
        // const cacheKey = 'schemaFields'
        // if (this.getValueInCache(cacheKey)) {
        //     return this.getValueInCache(cacheKey)
        // }
        const schemaPath = await this._schemaPath()
        const path = `${schemaPath}/fields.json`
        if (!(await checkFileExists(path))) {
            return null
        }

        const data = (await import(path, {
            assert: { type: "json" },
        })).default

        //this.cache[cacheKey] = data
        return data
    }

    async schemaIndexes(props) {
        // const cacheKey = 'schemaIndexes'
        // if (this.getValueInCache(cacheKey)) {
        //     return this.getValueInCache(cacheKey)
        // }

        const schemaPath = await this._schemaPath()
        const path = `${schemaPath}/indexes.json`

        if (!(await checkFileExists(path))) {
            return null
        }

        const data = (await import(path, {
            assert: { type: "json" },
        })).default

        //this.cache[cacheKey] = data
        return data
    }

    async schemaClassLevelPermissions(props) {
        // const cacheKey = 'schemaClassLevelPermissions'
        // if (this.getValueInCache(cacheKey)) {
        //     return this.getValueInCache(cacheKey)
        // }

        const schemaPath = await this._schemaPath()
        const path = `${schemaPath}/classLevelPermissions.json`

        if (!(await checkFileExists(path))) {
            return null
        }

        const data = (await import(path, {
            assert: { type: "json" },
        })).default

        //this.cache[cacheKey] = data
        return data
    }

    async schemaVersions() {
        // const cacheKey = 'schemaClassLevelPermissions'
        // if (this.getValueInCache(cacheKey)) {
        //     return this.getValueInCache(cacheKey)
        // }

        const schemaPath = await this._schemaPath()
        const path = `${schemaPath}/classLevelPermissions.json`

        if (!(await checkFileExists(path))) {
            return null
        }

        const data = (await import(path, {
            assert: { type: "json" },
        })).default

        //this.cache[cacheKey] = data
        return data
    }

    async _schemaPath() {
        //let version = this.currentProtocolVersion ? this.currentProtocolVersion : this.protocolVersion
        let version = this.protocol.version
        let versions = await this.schemaVersions()

        if (!version) {
            return `${this.path}/schema`
        }

        if (!versions
            || !versions.length) {
            return `${this.path}/schema`
        }

        if (versions
            && versions.length
            && !versions.includes(version)) {
            return `${this.path}/schema`
        }

        if (versions
            && versions.length
            && version === 'latest') {
            version = versions[versions.length - 1] //#TODO: sort by semver
        }

        const path = `${this.path}/schema/${version}`
        return path
    }


    async schemaVersions() {
        const cacheKey = '_schemaVersions'
        if (this.getValueInCache(cacheKey)) {
            return this.getValueInCache(cacheKey)
        }
        const items = await directories({ path: `${this.path}/schema` })
        if (!items || !items.length) {
            return null
        }
        let data = items.map(i => i.name)
        data = data.sort()
        this.cache[cacheKey] = data
        return data
    }

    async schemaVersionOf({ version, subPath }) {
        const cacheKey = `_schemaVersionOf${subPath}`
        if (this.getValueInCache(cacheKey)) {
            return this.getValueInCache(cacheKey)
        }

        const versions = await this.schemaVersions()
        if (!versions || !versions.includes(version)) {
            return null
        }

        const path = `${this.path}/schema/${version}/${subPath}`
        if (!(await checkFileExists(path))) {
            return null
        }

        const data = await import(path)
        this.cache[cacheKey] = data
        return data
    }

    async getClassProtocols({ className, withProtocolsProtocols = false }) {
        const cacheKey = 'class'
        if (this.getValueInCache(cacheKey)) {
            return this.getValueInCache(cacheKey)
        }

        const _class = await this.getClass({ className })
        if (!_class) {
            return null
        }

        let data = getMergedClassProtocols({ _class, withProtocolsProtocols })
        const path = `${this.path}/classes/${className}/class/protocols.js`
        if ((await checkFileExists(path))) {
            let _data = (await import(path)).default
            _data = _data ? _data : []
            data = [...data,
            ..._data]
        }

        //this.cache[cacheKey] = data
        data = cleanProtocols(data)
        // result = _.uniq(result, a => a.id)

        return data
    }


    async ownProtocols() {
        const cacheKey = 'ownProtocols'
        if (this.getValueInCache(cacheKey)) {
            return this.getValueInCache(cacheKey)
        }

        let path = `${this.path}/class/protocols.js`
        if (!(await checkFileExists(path))) {
            return null
        }

        const data = (await import(path)).default

        //this.cache[cacheKey] = data
        return data
    }

    async ownProtocolsClass() {
        const cacheKey = 'ownProtocolsClass'
        if (this.getValueInCache(cacheKey)) {
            return this.getValueInCache(cacheKey)
        }

        const path = `${this.path}/class/index.js`
        if (!(await checkFileExists(path))) {
            return null
        }
        // const _data = (await import(path))
        const data = (await import(path)).default
        //this.cache[cacheKey] = data
        return data
    }

    async liveClasses() {
        const cacheKey = 'liveClasses'
        if (this.getValueInCache(cacheKey)) {
            return this.getValueInCache(cacheKey)
        }

        const path = `${this.path}/liveClasses.js`
        if (!(await checkFileExists(path))) {
            return null
        }

        const data = (await import(path)).default
        //this.cache[cacheKey] = data
        return data
    }

    async systemDockerCompose() {
        const cacheKey = 'systemDockerCompose'
        if (this.getValueInCache(cacheKey)) {
            return this.getValueInCache(cacheKey)
        }

        const path = `${this.path}/system/docker/docker-compose.yaml`
        if (!(await checkFileExists(path))) {
            return null
        }

        const data = (await import(path))
        //this.cache[cacheKey] = data
        return data
    }

    async systemDockerComposeExists() {
        const path = this.systemDockerComposePath()
        return checkFileExists(path)
    }

    systemDockerComposePath() {
        return `${this.systemDockerComposeDirPath()}/docker-compose.yaml`
    }

    systemDockerDataPath() {
        return `${this.systemDockerComposeDirPath()}/data`
    }

    systemDockerComposeDirPath() {
        return `${this.path}/system/docker`
    }

    configDirPath() {
        return `${this.path}/config`
    }

    async configData() {
        // const cacheKey = 'schemaClassLevelPermissions'
        // if (this.getValueInCache(cacheKey)) {
        //     return this.getValueInCache(cacheKey)
        // }

        const schemaPath = await this._schemaPath()
        const path = `${this.configDirPath()}/index.json`

        if (!(await checkFileExists(path))) {
            return null
        }

        const data = (await import(path, {
            assert: { type: "json" },
        })).default

        //this.cache[cacheKey] = data
        return data
    }

    async systemDockerPayloadAdapter() {
        const cacheKey = 'systemDockerPayloadAdapter'
        if (this.getValueInCache(cacheKey)) {
            return this.getValueInCache(cacheKey)
        }

        const path = `${this.path}/system/docker/adaptPayload.js`
        if (!(await checkFileExists(path))) {
            return null
        }

        const data = (await import(path)).default
        //this.cache[cacheKey] = data
        return data
    }

    async cloudCodeFiles() {
        const cacheKey = 'cloudCodeFiles'
        if (this.getValueInCache(cacheKey)) {
            return this.getValueInCache(cacheKey)
        }

        let path = `${this.path}/cloudCode`
        if (!(await checkFileExists(path))) {
            path = `${this.path}/functions`
            if (!(await checkFileExists(path))) {
                return null
            }
        }

        const data = (await directoryFilesRecursive({ path }))
        //this.cache[cacheKey] = data
        return data
    }

    async jobFiles() {
        const cacheKey = 'jobFiles'
        if (this.getValueInCache(cacheKey)) {
            return this.getValueInCache(cacheKey)
        }

        const path = `${this.path}/jobs`
        if (!(await checkFileExists(path))) {
            return null
        }

        const data = (await directoryFilesRecursive({ path }))
        //this.cache[cacheKey] = data
        return data
    }
}



const getMergedClassProtocols = ({ _class, withProtocolsProtocols }) => {
    let classProtocols = _class.protocols ? _class.protocols : []
    if (!withProtocolsProtocols) {
        return cleanProtocols(classProtocols)
    }

    return null

    // let inheritedProtocols = _class.inheritedProtocols ? _class.inheritedProtocols : []
    // return cleanProtocols([
    //     ...classProtocols,
    //     ...inheritedProtocols
    // ])
}

