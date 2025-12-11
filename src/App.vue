<script setup lang="ts">
import { useGraph } from './hooks/useGraph2'

const { el, graphInstance } = useGraph()

const onExport = () => {
  const a = graphInstance.value?.toJSON()
  console.log('---a---', a)
}

const onParse = () => {
  const json = graphInstance.value?.toJSON()
  graphInstance.value?.fromJSON([
    {
      shape: 'edge',
      attrs: {
        line: {
          stroke: '#7c68fc'
        }
      },
      id: 'edge1',
      clipboard: true,
      zIndex: 1,
      router: 'orth',
      connector: 'rounded',
      labels: ['x6'],
      source: {
        cell: 'node1'
      },
      target: {
        cell: 'node2'
      }
    },
    {
      position: {
        x: 280,
        y: 200
      },
      size: {
        width: 60,
        height: 60
      },
      attrs: {
        text: {
          text: 'circle'
        }
      },
      visible: true,
      shape: 'circle',
      id: 'node2',
      zIndex: 2,
      ports: {
        groups: {
          top: {
            position: 'top',
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: '#31d0c6',
                strokeWidth: 2,
                fill: '#fff'
              }
            }
          },
          bottom: {
            position: 'bottom',
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: '#31d0c6',
                strokeWidth: 2,
                fill: '#fff'
              }
            }
          },
          left: {
            position: 'left',
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: '#31d0c6',
                strokeWidth: 2,
                fill: '#fff'
              }
            }
          },
          right: {
            position: 'right',
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: '#31d0c6',
                strokeWidth: 2,
                fill: '#fff'
              }
            }
          }
        },
        items: [
          {
            id: 'top',
            group: 'top',
            attrs: {
              text: {
                text: 'top'
              }
            }
          },
          {
            id: 'bottom',
            group: 'bottom',
            attrs: {
              text: {
                text: 'bottom'
              }
            }
          },
          {
            id: 'left',
            group: 'left',
            attrs: {
              text: {
                text: 'left'
              }
            }
          },
          {
            id: 'right',
            group: 'right',
            attrs: {
              text: {
                text: 'right'
              }
            }
          }
        ]
      }
    },
    {
      position: {
        x: 40,
        y: 40
      },
      size: {
        width: 100,
        height: 40
      },
      attrs: {
        text: {
          text: 'rect'
        },
        body: {
          stroke: '#000',
          fill: '#00f',
          strokeWidth: 2
        },
        label: {
          text: 'rect',
          fill: '#f00fff'
        }
      },
      visible: true,
      shape: 'rect',
      id: 'node1',
      zIndex: 12,
      markup: [
        {
          tagName: 'rect',
          selector: 'body'
        },
        {
          tagName: 'text',
          selector: 'label'
        }
      ],
      ports: {
        groups: {
          top: {
            position: 'top',
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: '#31d0c6',
                strokeWidth: 2,
                fill: '#fff'
              }
            }
          },
          bottom: {
            position: 'bottom',
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: '#31d0c6',
                strokeWidth: 2,
                fill: '#fff'
              }
            }
          },
          left: {
            position: 'left',
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: '#31d0c6',
                strokeWidth: 2,
                fill: '#fff'
              }
            }
          },
          right: {
            position: 'right',
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: '#31d0c6',
                strokeWidth: 2,
                fill: '#fff'
              }
            }
          }
        },
        items: [
          {
            id: 'top',
            group: 'top',
            attrs: {
              text: {
                text: 'top'
              }
            }
          },
          {
            id: 'bottom',
            group: 'bottom',
            attrs: {
              text: {
                text: 'bottom'
              }
            }
          },
          {
            id: 'left',
            group: 'left',
            attrs: {
              text: {
                text: 'left'
              }
            }
          },
          {
            id: 'right',
            group: 'right',
            attrs: {
              text: {
                text: 'right'
              }
            }
          }
        ]
      }
    }
  ])
}
</script>

<template>
  <div class="h-[calc(100vh)] w-full">
    <div class="fixed top-0 right-0 z-10 p-3">
      <el-button @click="onExport">导出</el-button>
      <el-button @click="onParse">Parse</el-button>
    </div>
    <div class="h-full w-full" ref="el"></div>
  </div>
</template>
