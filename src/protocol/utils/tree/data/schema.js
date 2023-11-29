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
              path: 'index',
              extensionTypes: ['json'],
              priority: 0,
            },
            {
              type: 'file',
              path: 'index',
              extensionTypes: 'js',
              priority: 0,
            },
          ]
        },
        {
          id: 'classes',
          routes: [
            {
              type: 'file',
              path: 'classes',
              extensionTypes: ['json'],
              priority: 0,
            }
          ]
        },
        {
          id: 'classLevelPermission',
          routes: [
            {
              type: 'file',
              path: 'classLevelPermission',
              extensionTypes: ['json'],
              priority: 0,
            }
          ]
        },
        {
          id: 'fields',
          routes: [
            {
              type: 'file',
              path: 'fields',
              extensionTypes: ['json'],
              priority: 0,
            }
          ]
        },
        {
          id: 'indexes',
          routes: [
            {
              type: 'file',
              path: 'indexes',
              extensionTypes: ['json'],
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
                              path: 'index',
                              extensionTypes: 'js',
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
                              path: 'index',
                              extensionTypes: 'js',
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
