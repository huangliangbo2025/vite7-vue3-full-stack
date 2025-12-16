<script setup lang="ts">
interface Props {
  modelValue?: any[]
  onCreate?: () => any
  isOnlyView?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  onCreate: () => ({}),
  isOnlyView: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: any[]): void
}>()

const create = (index: number) => {
  if (props.isOnlyView) return
  const createValue = props.onCreate()
  const arr = [...props.modelValue]
  arr.splice(index + 1, 0, createValue)

  emit('update:modelValue', arr)
}

const remove = (index: number) => {
  if (props.isOnlyView) return
  const arr = [...props.modelValue]
  arr.splice(index, 1)

  emit('update:modelValue', arr)
}

// 移动项目
const move = (index: number, direction: 'up' | 'down') => {
  if (props.isOnlyView) return
  const arr = [...props.modelValue]

  // 向上移动
  if (direction === 'up' && index > 0) {
    // 交换位置
    ;[arr[index], arr[index - 1]] = [arr[index - 1], arr[index]]
  }
  // 向下移动
  else if (direction === 'down' && index < arr.length - 1) {
    // 交换位置
    ;[arr[index], arr[index + 1]] = [arr[index + 1], arr[index]]
  }
  emit('update:modelValue', arr)
}
</script>

<template>
  <div class="w-full">
    <slot :remove="remove" :create="create" :move="move" :list="modelValue"></slot>
  </div>
</template>
