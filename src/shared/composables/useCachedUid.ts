import type { ComponentPublicInstance, Ref } from 'vue'
import { onMounted, readonly, ref } from 'vue'
import { isServer } from '@/shared/utils/ssr'

const uid = (prefix = ''): string => {
  const id = Date.now().toString(36) + Math.random().toString(36).substring(2)
  return prefix ? `${prefix}-${id}` : id
}

const UID_CACHE_ATTR = 'data-ssr-uid'

type CacheElement = HTMLElement | ComponentPublicInstance | null

export interface UseCachedUid {
  id: Readonly<Ref<string>>
  cacheAttrs: {
    ref: Ref<CacheElement>
    [UID_CACHE_ATTR]?: string
  }
}

/**
 * When using SSR, we cannot just generate a random ID, or server and client values won't match.
 * The idea here is to store the server generated ID on a dom node (target) and restore it when mounting the component client side.
 */
export const useCachedUid = (prefix?: string): UseCachedUid => {
  const id = ref(uid(prefix))
  const cacheElement = ref<CacheElement>(null)

  onMounted(() => {
    if (cacheElement.value) {
      // It can happen that the element holding the cache reference a Vue component
      // in this case we'll use it's root element instead ($el)
      const element = (cacheElement.value as ComponentPublicInstance).$el ?? cacheElement.value
      const serverId = element.getAttribute(UID_CACHE_ATTR)

      if (serverId) {
        id.value = serverId
      }
    }
  })

  return {
    id: readonly(id),
    cacheAttrs: {
      ref: cacheElement,
      [UID_CACHE_ATTR]: isServer ? id.value : undefined
    }
  }
}
