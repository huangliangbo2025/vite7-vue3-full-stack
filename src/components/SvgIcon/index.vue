<!-- src/components/Icon/SvgSpriteIcon.vue -->
<script setup lang="ts">
interface Props {
  name: string
  size?: string | number
  color?: string
  spin?: boolean
}

withDefaults(defineProps<Props>(), {
  size: '1em',
  color: 'currentColor',
  spin: false
})
</script>

<template>
  <svg
    class="svg-icon"
    :class="{
      'svg-icon-spin': spin
    }"
    :style="{
      width: size,
      height: size,
      color
    }"
    aria-hidden="true"
  >
    <use :xlink:href="`#icon-${name}`" />
  </svg>
</template>

<style scoped>
.svg-icon {
  display: inline-block;
  overflow: hidden;
  vertical-align: middle;
  fill: currentcolor;
}

.svg-icon-spin {
  animation: icon-spin 1s infinite linear;
}

@keyframes icon-spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
