export default {
  id: 'root',
  name: 'class',
  description: 'class',
  routes: [
    {
      type: 'folder',
      path: '',
      priority: 0,
      children: [
        {
          id: 'manifest',
          name: 'Manifest',
          description: 'Manifest',
          routes: [
            {
              type: 'file',
              path: 'manifest.json',
              extensionType: 'json'
            },
          ]
        },
        {
          id: 'functions',
          routes: [
            {
              type: 'filesCollection',
              path: 'functions',
              priority: 0,
            },
            {
              path: 'cloudCode',
              priority: 1,
              isDeprecated: true
            }
          ]
        },

        {
          id: 'class',
          routes: [
            {
              type: 'folder',
              path: 'class',
              priority: 0,
              isDeprecated: false,
              children: [
                {
                  id: 'index',
                  routes: [
                    {
                      type: 'file',
                      extensionType: 'js',
                      path: 'index.js',
                    }
                  ]
                },
                {
                  id: 'protocols',
                  routes: [
                    {
                      type: 'file',
                      extensionType: 'js',
                      path: 'protocols.js',
                    }
                  ]
                },
              ]
            }
          ],
        },
        {
          id: 'seed',
          routes: [
            {
              type: 'folder',
              path: 'seed',
              priority: 0,
              isDeprecated: false,
              children: [
                {
                  id: 'index',
                  routes: [
                    {
                      type: 'file',
                      extensionType: 'js',
                      path: 'index.js',
                    }
                  ]
                },
                {
                  id: 'ref',
                  routes: [
                    {
                      type: 'file',
                      extensionType: 'js',
                      path: 'ref.js',
                    }
                  ]
                },
                {
                  id: 'transformer',
                  routes: [
                    {
                      type: 'file',
                      extensionType: 'js',
                      path: 'transformer.js',
                    }
                  ]
                },
                {
                  id: 'executor',
                  routes: [
                    {
                      type: 'file',
                      extensionType: 'json',
                      path: 'executor.json',
                    }
                  ]
                },
                {
                  id: 'data',
                  routes: [
                    {
                      type: 'file',
                      extensionType: 'json',
                      path: 'data.json',
                    }
                  ]
                },
                {
                  id: 'validator',
                  routes: [
                    {
                      type: 'file',
                      extensionType: 'js',
                      path: 'validator.js',
                    }
                  ]
                },
              ]
            }
          ],
        },
        {
          id: 'triggers',
          routes: [
            {
              type: 'folder',
              path: 'triggers',
              priority: 0,
              isDeprecated: false,
              children: [
                {
                  id: 'beforeSave',
                  routes: [
                    {
                      type: 'file',
                      extensionType: 'js',
                      path: 'beforeSave.js',
                    }
                  ]
                },
                {
                  id: 'afterSave',
                  routes: [
                    {
                      type: 'file',
                      extensionType: 'js',
                      path: 'afterSave.js',
                    }
                  ]
                }
              ]
            }
          ],
        }
      ]
    },
  ]
}
