export default {
  id: 'manifest',
  name: 'Manifest',
  description: 'Manifest',
  routes: [
    {
      type: 'file',
      path: 'manifest.json',
      extensionType: 'json',
      priority: 0,
      children: [
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
