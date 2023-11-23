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
          id: 'liveClasses',
          name: 'Live classes',
          description: 'Live classes',
          routes: [
            {
              type: 'file',
              path: 'liveClasses.js',
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
          id: 'classes',
          routes: [
            {
              type: 'templateCollection',
              templateId: 'classes',
              path: 'classes',
            }
          ]
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
