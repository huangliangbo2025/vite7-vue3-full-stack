<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue'
import hljs from 'highlight.js'
import java from 'highlight.js/lib/languages/java'
import sql from 'highlight.js/lib/languages/sql'
import 'highlight.js/styles/atom-one-dark.css' // 如果需要，在你的组件导入它
// import 'highlight.js/styles/github.css'

hljs.registerLanguage('javascript', java)
hljs.registerLanguage('xml', sql)

const props = defineProps<{
  code: string
}>()

const codeRef = ref<HTMLElement | null>(null)

const highlight = async () => {
  await nextTick()
  if (codeRef.value) {
    hljs.highlightElement(codeRef.value)
  }
}

onMounted(highlight)

watch(() => props.code, highlight)
</script>

<template>
  <pre class="h-full w-full overflow-auto">
    <code ref="codeRef" class="hljs">
{{ code }}
    </code>
  </pre>
</template>
