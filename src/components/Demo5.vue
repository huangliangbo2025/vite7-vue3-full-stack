<script setup lang="tsx">
import { onMounted, defineComponent } from 'vue'
import { Graph, Snapline, Stencil, type Node } from '@antv/x6'
import { register } from '@antv/x6-vue-shape'

/**
 * ------------ Vue TSX Component 替换 React Component ------------
 */
const AgentReactCard = defineComponent({
  props: { node: Object as () => Node },
  setup(props) {
    return () => {
      const raw = props.node!.getData() as any
      const data = {
        key: raw?.key ?? 'unknown',
        iconText: raw?.iconText ?? '',
        title: raw?.title ?? '',
        desc: raw?.desc ?? '',
        theme: raw?.theme ?? 'blue',
        inputPlaceholder: raw?.inputPlaceholder
      }

      return (
        <div class={['agent-card', data.theme]}>
          <div class="header">
            <div class="icon">{data.iconText}</div>
            <div class="title">{data.title}</div>
            <div class="actions">
              <span
                class="op"
                title="删除节点"
                onClick={(e) => {
                  e.stopPropagation()
                  if (data.key === 'start' || data.key === 'end') return
                  props.node?.remove()
                }}
              >
                ✖️
              </span>
            </div>
          </div>

          {data.inputPlaceholder ? (
            <div class="body">
              <span class="section">节点内容</span>
              <input type="text" placeholder={data.inputPlaceholder} />
            </div>
          ) : (
            <div class="desc">{data.desc}</div>
          )}
        </div>
      )
    }
  }
})

const FlowCard = defineComponent({
  props: { node: Object as () => Node },
  setup(props) {
    return () => {
      const data = props.node!.getData() as any
      const shape = props.node!.shape
      const type = shape === 'agent-end-card' ? 'end' : 'start'

      return (
        <div class={['flow-card', type]}>
          <div class="header">
            <div class="icon">{type === 'end' ? 'E' : 'S'}</div>
            <div class="title">{data.title}</div>
            {data.badge && <div class="badge">{data.badge}</div>}
          </div>

          {type === 'start' ? (
            <div class="body">
              <span class="section">Agent 开始节点</span>
            </div>
          ) : (
            <div class="footer">
              <span class="section">Agent 结束节点</span>
            </div>
          )}
        </div>
      )
    }
  }
})

/**
 * ------------ 注册 Vue 组件为 X6 Shape ------------
 */
register({
  shape: 'agent-react-card',
  component: AgentReactCard
})

register({
  shape: 'agent-start-card',
  component: FlowCard
})
register({
  shape: 'agent-end-card',
  component: FlowCard
})

/**
 * ------------ Graph 初始化 ------------
 */
let graph: Graph | null = null

onMounted(async () => {
  const container = document.getElementById('graph-container')!
  const stencilContainer = document.getElementById('stencil')!

  graph = new Graph({
    container,
    grid: true,
    mousewheel: { enabled: true },
    connecting: {
      connector: { name: 'smooth' },
      allowBlank: false,
      allowLoop: false,
      allowEdge: false,
      highlight: true
    }
  })

  graph.use(new Snapline())

  const stencil = new Stencil({
    title: '智能体流程编排',
    target: graph
  })

  stencilContainer.appendChild(stencil.container)

  // Node/Edge 注册略（可保持原样复制进去）
})
</script>

<template>
  <div id="container">
    <div id="stencil"></div>
    <div id="graph-container"></div>
  </div>
</template>

<style lang="scss">
#container {
  display: flex;
  border: 1px solid #dfe3e8;
  height: 480px;
}

#stencil {
  width: 260px;
  height: 100%;
  border-right: 1px solid #dfe3e8;
}

#graph-container {
  flex: 1;
  height: 100%;
}

/* 把你原来的 CSS 全部迁入这里（已省略） */
.agent-card {
  display: flex;
  flex-direction: column;
  padding: 12px;
  width: 260px;
  height: 96px;
  border-radius: 8px;
  border: 1px solid #5f95ff;
  background: #fff;

  .header {
    display: flex;
    align-items: center;
  }
}

.flow-card {
  display: flex;
  flex-direction: column;
  width: 260px;
  height: 96px;
  padding: 12px;
  border: 1px solid #5f95ff;
  border-radius: 12px;
  background: white;
}
</style>
