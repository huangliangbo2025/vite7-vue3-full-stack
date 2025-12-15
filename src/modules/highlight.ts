import hljsVuePlugin from '@highlightjs/vue-plugin'
import hljs from 'highlight.js/lib/core'
import java from 'highlight.js/lib/languages/java'
import sql from 'highlight.js/lib/languages/sql'
// import "highlight.js/styles/atom-one-dark.css"; // 如果需要，在你的组件导入它
import 'highlight.js/styles/github.css'
import type { UserModule } from '@/types/modules'

// 全局注册highlight组件，可以直接使用 src/components/HighlightCode 组件
export const install: UserModule = ({ app }) => {
  hljs.registerLanguage('javascript', java)
  hljs.registerLanguage('xml', sql)
  app.use(hljsVuePlugin)
}
