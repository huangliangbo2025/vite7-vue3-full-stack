<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const { isRouterAlive = true } = defineProps({
  // 这个配置可以重刷当前组件
  isRouterAlive: Boolean
})
const route = useRoute()
const router = useRouter()

const keepAliveComponents = computed(
  () =>
    router
      .getRoutes()
      .filter((item) => item.meta && item.name && item.meta.keepAlive)
      .map((item) => item.name) as string[]
)

// const activePath = computed(() => route.fullPath)
</script>

<template>
  <router-view v-slot="{ Component }">
    <template v-if="Component">
      <transition mode="out-in" name="fade-slide" appear>
        <keep-alive :include="keepAliveComponents">
          <component :is="Component" v-if="isRouterAlive" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </template>
  </router-view>
</template>
