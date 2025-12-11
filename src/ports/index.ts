import type { PortManager } from '@antv/x6/lib/model/port'

const portCommonAttrs = {
  circle: {
    r: 6,
    magnet: true,
    stroke: '#31d0c6',
    strokeWidth: 2,
    fill: '#fff',
    // fontSize: 10,
  },
}

export const ports: PortManager.Metadata = {
  groups: {
    top: {
      position: 'top',
      attrs: portCommonAttrs,
    },
    bottom: {
      position: 'bottom',
      attrs: portCommonAttrs,
    },
    left: {
      position: 'left',
      attrs: portCommonAttrs,
    },
    right: {
      position: 'right',
      attrs: portCommonAttrs,
    },
  },
  items: [
    {
      id: 'top',
      group: 'top',
      attrs: {
        text: { // 标签选择器
          text: 'top', // 标签文本
        },
      },
    },
    {
      id: 'bottom',
      group: 'bottom',
      attrs: {
        text: { // 标签选择器
          text: 'bottom', // 标签文本
        },
      },
    },
    {
      id: 'left',
      group: 'left',
      attrs: {
        text: { // 标签选择器
          text: 'left', // 标签文本
        },
      },
    },
    {
      id: 'right',
      group: 'right',
      attrs: {
        text: { // 标签选择器
          text: 'right', // 标签文本
        },
      },
    },
  ],
}
