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
              mimeTypes: ['application/json']
            },
            {
              type: 'file',
              path: 'manifest',
              mimeTypes: ['application/json']
            },
          ]
        },
        {
          id: 'README',
          routes: [
            {
              type: 'file',
              mimeTypes: ['text/markdown'],
              path: 'README',
            }
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
                      mimeTypes: ['image/svg+xml', 'image/png', 'image/jpeg', 'image/gif', 'image/webp'],
                      path: 'icon',
                      variants: ['@2x', '@3x'],
                    }
                  ]
                },
                {
                  id: 'thumbnail',
                  routes: [
                    {
                      type: 'file',
                      mimeTypes: ['image/svg+xml', 'image/png', 'image/jpeg', 'image/gif', 'image/webp'],
                      path: 'thumbnail',
                      params: {
                        quality: 80,
                        maxWidth: 2048,
                      },
                      variants: ['@2x', '@3x'],
                    }
                  ]
                },
                {
                  id: 'cover',
                  routes: [
                    {
                      type: 'file',
                      mimeTypes: ['image/png', 'image/jpeg'],
                      path: 'cover',
                      variants: ['@2x', '@3x'],
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
                      mimeTypes: ['text/javascript'],
                      path: 'index',
                    }
                  ]
                },
                {
                  id: 'protocols',
                  routes: [
                    {
                      type: 'file',
                      mimeTypes: ['text/javascript'],
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
                      mimeTypes: ['text/javascript'],
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
                      mimeTypes: ['text/javascript'],
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
                      mimeTypes: ['application/json'],
                      path: 'conditions',
                    }
                  ]
                },
                {
                  id: 'entries',
                  routes: [
                    {
                      type: 'file',
                      mimeTypes: ['application/json'],
                      path: 'entries',
                    }
                  ]
                },
                {
                  id: 'groups',
                  routes: [
                    {
                      type: 'file',
                      mimeTypes: ['application/json'],
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
                              mimeTypes: ['text/yaml'],
                              path: 'docker-compose',
                            }
                          ]
                        },
                        {
                          id: 'adaptPayload',
                          routes: [
                            {
                              type: 'file',
                              mimeTypes: ['text/javascript'],
                              path: 'adaptPayload',
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
                      mimeTypes: ['text/javascript'],
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
              mimeTypes: ['text/javascript'],
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
                      mimeTypes: ['text/javascript'],
                      path: 'beforeSave',
                    }
                  ]
                },
                {
                  id: 'afterSave',
                  routes: [
                    {
                      type: 'file',
                      mimeTypes: ['text/javascript'],
                      path: 'afterSave',
                    }
                  ]
                },
                {
                  id: 'beforeFind',
                  routes: [
                    {
                      type: 'file',
                      mimeTypes: ['text/javascript'],
                      path: 'beforeFind',
                    }
                  ]
                },
                {
                  id: 'afterFind',
                  routes: [
                    {
                      type: 'file',
                      mimeTypes: ['text/javascript'],
                      path: 'afterFind',
                    }
                  ]
                },
                {
                  id: 'beforeDelete',
                  routes: [
                    {
                      type: 'file',
                      mimeTypes: ['text/javascript'],
                      path: 'beforeDelete',
                    }
                  ]
                },
                {
                  id: 'afterDelete',
                  routes: [
                    {
                      type: 'file',
                      mimeTypes: ['text/javascript'],
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
