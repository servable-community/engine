export default {
  id: 'root',
  name: 'schema',
  description: 'schema',
  routes: [
    {
      type: 'folder',
      path: '',
      priority: 0,
      children: [
        {
          id: 'index',
          routes: [
            {
              type: 'file',
              path: 'index.json',
              extensionType: 'json',
              priority: 0,
            },
            {
              type: 'file',
              path: 'index.js',
              extensionType: 'js',
              priority: 0,
            },
          ]
        },
        {
          id: 'classes',
          routes: [
            {
              type: 'file',
              path: 'classes.json',
              extensionType: 'json',
              priority: 0,
            }
          ]
        },
        {
          id: 'classLevelPermission',
          routes: [
            {
              type: 'file',
              path: 'classLevelPermission.json',
              extensionType: 'json',
              priority: 0,
            }
          ]
        },
        {
          id: 'fields',
          routes: [
            {
              type: 'file',
              path: 'fields.json',
              extensionType: 'json',
              priority: 0,
            }
          ]
        },
        {
          id: 'indexes',
          routes: [
            {
              type: 'file',
              path: 'indexes.json',
              extensionType: 'json',
              priority: 0,
            }
          ]
        },
        {
          id: 'migration',
          routes: [
            {
              type: 'folder',
              path: 'migration',
              priority: 0,
              children: [
                {
                  id: 'down',
                  routes: [
                    {
                      type: 'folder',
                      path: 'down',
                      children: [
                        {
                          id: 'index',
                          routes: [
                            {
                              type: 'file',
                              path: 'index.js',
                            }
                          ]
                        },
                      ]
                    },
                  ]
                },
                {
                  id: 'up',
                  routes: [
                    {
                      type: 'folder',
                      path: 'up',
                      children: [
                        {
                          id: 'index',
                          routes: [
                            {
                              type: 'file',
                              path: 'index.js',
                            }
                          ]
                        },
                      ]
                    },
                  ]
                }
              ]
            }]
        }]
    }
  ]
}
