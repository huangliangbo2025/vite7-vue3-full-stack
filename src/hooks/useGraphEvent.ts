import type { Graph } from '@antv/x6'

export const useGraphEvent = (graphInstance: Ref<Graph>) => {
  const options = {
    offset: 30,
    useLocalStorage: true,
  }
  const onCopy = () => {
    const cells = graphInstance.value?.getSelectedCells()
    if (cells && cells.length) {
      graphInstance.value?.copy(cells, options)
      ElMessage.success('复制成功')
    } else {
      ElMessage.info('请先选中节点再复制')
    }
    return false
  }

  const onPaste = () => {
    if (graphInstance.value?.isClipboardEmpty())
      ElMessage.info('剪切板为空，不可粘贴')
    else {
      const cells = graphInstance.value?.paste(options)
      graphInstance.value?.cleanSelection()
      graphInstance.value?.select(cells)
      ElMessage.success('粘贴成功')
    }
    return false
  }

  const onCut = () => {
    const cells = graphInstance.value?.getSelectedCells()
    if (cells && cells.length) {
      graphInstance.value?.cut(cells, options)
      ElMessage.success('剪切成功')
    } else {
      ElMessage.info('请先选中节点再剪切')
    }
    return false
  }

  const onDelete = () => {
    const cells = graphInstance.value?.getSelectedCells()
    if (cells && cells.length)
      graphInstance.value?.removeCells(cells, options)
  }

  graphInstance.value.bindKey(['ctrl+c', 'meta+c'], () => {
    onCopy()
  })

  graphInstance.value.bindKey(['ctrl+v', 'meta+v'], () => {
    onPaste()
  })

  graphInstance.value.bindKey(['ctrl+x', 'meta+x'], () => {
    onCut()
  })

  graphInstance.value.bindKey(['delete', 'backspace'], () => {
    onDelete()
  })

  graphInstance.value.on('cell:dblclick', ({ cell }) => {
    if (cell.isNode()) {
      const data = cell.getData()
      console.log('double click node:', cell)
      console.log('data:', data)
    }
  })

  /* onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown)
  })

  const handleKeydown = (e: KeyboardEvent) => {
    if (!graphInstance.value) return

    // Ctrl/Cmd
    const isCtrl = e.ctrlKey || e.metaKey

    if (isCtrl && e.key === 'c') {
      e.preventDefault()
      onCopy()
    }

    if (isCtrl && e.key === 'x') {
      e.preventDefault()
      onCut()
    }

    if (isCtrl && e.key === 'v') {
      e.preventDefault()
      onPaste()
    }
  } */
}
