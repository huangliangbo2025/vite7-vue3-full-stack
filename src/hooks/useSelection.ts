import type { Graph, Node } from '@antv/x6'

export const useSelection = (graphInstance: Ref<Graph | null>) => {
  const selectedNodes = ref<Set<string>>(new Set())

  const selectNode = (node: Node) => {
    selectedNodes.value.add(node.id)
    highlightNode(node)
  }

  const unselectNode = (node: Node) => {
    selectedNodes.value.delete(node.id)
    unhighlightNode(node)
  }

  const clearSelection = () => {
    selectedNodes.value.forEach(id => {
      const node = graphInstance.value?.getCellById(id)
      if (node) unhighlightNode(node)
    })
    selectedNodes.value.clear()
  }
  const highlightNode = (node: Node) => {
    node.attr('body/stroke', '#3b82f6')
    node.attr('body/strokeWidth', 2)
  }

  const unhighlightNode = (node: Node) => {
    node.attr('body/stroke', '#5F95FF')
    node.attr('body/strokeWidth', 1)
  }

  return {
    selectedNodes,
    selectNode,
    unselectNode,
    clearSelection,
  }
}
