export default {
  id: 'root',
  name: 'protocol',
  description: 'protocol',
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
        // {
        //   id: 'lib',
        //   routes: [
        //     {
        //       type: 'filesCollection',
        //       path: 'lib',
        //       priority: 0,
        //     }
        //   ]
        // },
        {
          id: 'classes',
          routes: [
            {
              type: 'templateCollection',
              templateId: 'class',
              path: 'classes',
            }
          ]
        },
        {
          id: 'schema',
          routes: [
            {
              type: 'templateCollection',
              templateId: 'schema',
              path: 'schema',
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
                },
                {
                  id: 'beforeFind',
                  routes: [
                    {
                      type: 'file',
                      extensionType: 'js',
                      path: 'beforeFind.js',
                    }
                  ]
                },
                {
                  id: 'afterFind',
                  routes: [
                    {
                      type: 'file',
                      extensionType: 'js',
                      path: 'afterFind.js',
                    }
                  ]
                },
                {
                  id: 'beforeDelete',
                  routes: [
                    {
                      type: 'file',
                      extensionType: 'js',
                      path: 'beforeDelete.js',
                    }
                  ]
                },
                {
                  id: 'afterDelete',
                  routes: [
                    {
                      type: 'file',
                      extensionType: 'js',
                      path: 'afterDelete.js',
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
