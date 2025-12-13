import type { MaybeRefOrGetter } from 'vue'

export function useFeature(id: MaybeRefOrGetter<number>) {
  watch(() => toValue(id), (id) => {
    // 处理 id 变更
    console.log('useFeature', id)
  })
}
