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
          id: 'index',
          name: 'Index',
          description: 'Index',
          routes: [
            {
              type: 'file',
              path: 'index',
              extensionTypes: ['json']
            },
            {
              type: 'file',
              path: 'manifest',
              extensionTypes: ['json']
            },
          ]
        },
        {
          id: 'assets',
          routes: [
            {
              type: 'folder',
              path: 'assets',
              children: [
                {
                  id: 'icon',
                  routes: [
                    {
                      type: 'file',
                      extensionTypes: ['svg', 'png', 'jpeg'],
                      path: 'icon',
                    }
                  ]
                },
                {
                  id: 'thumbnail',
                  routes: [
                    {
                      type: 'file',
                      extensionTypes: ['png', 'jpeg'],
                      path: 'thumbnail',
                    }
                  ]
                },
              ]
            }
          ],
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
                      extensionTypes: ['js'],
                      path: 'index',
                    }
                  ]
                },
                {
                  id: 'protocols',
                  routes: [
                    {
                      type: 'file',
                      extensionTypes: ['js'],
                      path: 'protocols',
                    }
                  ]
                },
              ]
            }
          ],
        },
        {
          id: 'afterInit',
          routes: [
            {
              type: 'folder',
              path: 'afterInit',
              priority: 0,
              children: [
                {
                  id: 'index',
                  routes: [
                    {
                      type: 'file',
                      extensionTypes: ['js'],
                      path: 'index',
                    }
                  ]
                }
              ]
            }
          ],
        },
        {
          id: 'beforeInit',
          routes: [
            {
              type: 'folder',
              path: 'beforeInit',
              priority: 0,
              children: [
                {
                  id: 'index',
                  routes: [
                    {
                      type: 'file',
                      extensionTypes: ['js'],
                      path: 'index',
                    }
                  ]
                }
              ]
            }
          ],
        },
        {
          id: 'config',
          routes: [
            {
              type: 'folder',
              path: 'config',
              priority: 0,
              children: [
                {
                  id: 'conditions',
                  routes: [
                    {
                      type: 'file',
                      extensionTypes: ['json'],
                      path: 'conditions',
                    }
                  ]
                },
                {
                  id: 'entries',
                  routes: [
                    {
                      type: 'file',
                      extensionTypes: ['json'],
                      path: 'entries',
                    }
                  ]
                },
                {
                  id: 'groups',
                  routes: [
                    {
                      type: 'file',
                      extensionTypes: ['json'],
                      path: 'groups',
                    }
                  ]
                }
              ]
            }
          ],
        },
        {
          id: 'system',
          routes: [
            {
              type: 'folder',
              path: 'system',
              priority: 0,
              children: [
                {
                  id: 'docker',
                  routes: [
                    {
                      type: 'folder',
                      path: 'docker',
                      priority: 0,
                      children: [
                        {
                          id: 'docker-compose',
                          routes: [
                            {
                              type: 'file',
                              extensionTypes: ['yaml'],
                              path: 'docker-compose',
                            }
                          ]
                        }
                      ]
                    }
                  ],
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
              children: [
                {
                  id: 'index',
                  routes: [
                    {
                      type: 'file',
                      extensionTypes: ['js'],
                      path: 'index',
                    }
                  ]
                }
              ]
            }
          ],
        },
        {
          id: 'liveClasses',
          name: 'Live classes',
          description: 'Live classes',
          routes: [
            {
              type: 'file',
              path: 'liveClasses',
              extensionTypes: ['js'],
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
          id: 'lib',
          routes: [
            {
              type: 'filesCollection',
              path: 'lib',
              priority: 0,
            }
          ]
        },
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
                      extensionTypes: ['js'],
                      path: 'beforeSave',
                    }
                  ]
                },
                {
                  id: 'afterSave',
                  routes: [
                    {
                      type: 'file',
                      extensionTypes: ['js'],
                      path: 'afterSave',
                    }
                  ]
                },
                {
                  id: 'beforeFind',
                  routes: [
                    {
                      type: 'file',
                      extensionTypes: ['js'],
                      path: 'beforeFind',
                    }
                  ]
                },
                {
                  id: 'afterFind',
                  routes: [
                    {
                      type: 'file',
                      extensionTypes: ['js'],
                      path: 'afterFind',
                    }
                  ]
                },
                {
                  id: 'beforeDelete',
                  routes: [
                    {
                      type: 'file',
                      extensionTypes: ['js'],
                      path: 'beforeDelete',
                    }
                  ]
                },
                {
                  id: 'afterDelete',
                  routes: [
                    {
                      type: 'file',
                      extensionTypes: ['js'],
                      path: 'afterDelete',
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
