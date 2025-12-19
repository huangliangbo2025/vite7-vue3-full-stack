import { createApp, reactive } from 'vue'
import LogDialog from './index.vue'

interface LogMessageOptions {
  apiUrl?: string
  content: string
}

export function logMessage(options: LogMessageOptions) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  container.style.height = '100%'
  container.style.width = '100%'
  const state = reactive({
    visible: true,
    ...options,
  })

  const app = createApp(LogDialog, {
    apiUrl: state.apiUrl,
    content: state.content,
    modelValue: state.visible,
    'onUpdate:modelValue': (val: boolean) => {
      state.visible = val
      if (!val) {
        setTimeout(() => {
          app.unmount()
          container.remove()
        }, 300)
      }
    },
  })

  app.mount(container)
}
