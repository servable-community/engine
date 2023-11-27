export const ProtocolEnum = {
  Manifest: { id: 'manifest' },
  LiveClasses: { id: 'liveClasses' },
  Classes: { id: 'classes', },
  Class: {
    id: 'class',
    Index: {
      id: 'index',
      parents: ['class'],
    },
    Protocols: {
      id: 'protocols',
      parents: ['class']
    },
  },
  Functions: {
    id: 'functions',
  },
  Schema: { id: 'schema' },
}

export const ClassEnum = {
  Manifest: {
    id: 'manifest',
  },
  Class: {
    id: 'class',
    Index: {
      id: 'index',
      parents: ['class']
    },
    Protocols: {
      id: 'protocols',
      parents: ['class']
    },
  },
  Seed: {
    id: 'seed',
    Index: {
      id: 'index',
      parents: ['seed']
    },
    Ref: {
      id: 'ref',
      parents: ['seed']
    },
    Executor: {
      id: 'executor',
      parents: ['seed']
    },
    Transformer: {
      id: 'transformer',
      parents: ['seed']
    },
    Validator: {
      id: 'validator',
      parents: ['seed']
    },
  },
  Functions: { id: 'functions' },
}

export const SchemaEnum = {
  Index: { id: 'index' },
  ClassLevelPermissions: { id: 'classLevelPermissions' },
  Migration: {
    id: 'migration',
    Index: {
      id: 'index',
      parents: ['migration']
    },
    Up: {
      id: 'up',
      Index: {
        id: 'index',
        parents: ['migration', 'up']
      },
      parents: ['migration']
    },
    Down: {
      id: 'down',
      Index: {
        id: 'index',
        parents: ['migration', 'down']
      },
      parents: ['migration']
    },
  },
}

export const DataTemplateType = {
  Protocol: 'protocol',
  Class: 'class',
  Schema: 'schema',
}


// import Enum from 'keynum'

// export const _ProtocolEnum = Enum([
//   'Manifest',
//   'Classes',
//   'Class',
//   'Schema'
// ])

// export const ClassEnum = Enum([
//   'Manifest',
//   'Classes',
//   'Class',
//   'Schema'
// ])

// export const ProtocolEnum = {
//   Manifest: 'manifest',
//   Classes: 'classes',
//   Class: {
//     Index: 'index',
//     Protocols: 'protocols'
//   },
//   Functions: 'functions',
//   Schema: 'schema',
// }
