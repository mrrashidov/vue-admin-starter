<script lang="ts" setup>
import { computed } from 'vue'
import BaseIcon from '@/shared/components/BaseIcon/BaseIcon.vue'
import { isDefined } from '@/shared/utils'
import type { ButtonVariant, Icon } from './types'

const props = withDefaults(
  defineProps<{
    type?: 'button' | 'submit'
    size?: 'sm' | 'md' | 'lg' | 'none'
    variant?: ButtonVariant
    icon?: Icon
    href?: string
    hasDefaultSlot?: boolean
    link?: boolean
    centered?: boolean
    outlined?: boolean
    loading?: boolean
    disabled?: boolean
    active?: boolean
    exactActive?: boolean
  }>(),
  {
    type: 'button',
    variant: 'primary',
    size: 'md',
    hasDefaultSlot: true,
    centered: true
  }
)

defineEmits(['click'])

const btnVariant = computed(() => {
  switch (props.variant) {
    case 'primary': {
      if (props.link) {
        return 'bg-white text-primary border-0 hover:text-secondary focus-visible:ring-primary/30'
      }

      let className = 'border-2 border-primary focus-visible:ring-primary/30 '
      if (props.outlined) {
        return className + 'bg-white text-primary hover:bg-primary hover:text-white'
      }
      return className + 'bg-primary text-white hover:bg-secondary hover:border-secondary'
    }

    case 'secondary': {
      if (props.link) {
        return 'bg-white text-secondary border-0 hover:text-primary focus-visible:ring-primary/30'
      }

      return 'bg-secondary/10 text-primary border-2 border-transparent focus-visible:ring-primary/30 hover:bg-secondary/20'
    }

    case 'light': {
      let className = 'border-2 focus-visible:ring-light/30 '
      return className + 'bg-light text-primary border-light hover:bg-gray hover:border-gray'
    }

    case 'gray-light': {
      if (props.link) {
        return 'bg-white text-primary border-0 focus-visible:ring-primary/30'
      }

      return 'bg-gray-light text-primary border-2 border-transparent focus-visible:ring-primary/30 hover:bg-gray/70'
    }

    case 'error': {
      if (props.link) {
        return 'bg-white text-error border-0 hover:text-error-dark focus-visible:ring-error/30'
      }

      let className = 'border-2 border-error focus-visible:ring-error/30 '
      if (props.outlined) {
        return className + 'bg-white text-error hover:bg-error hover:text-white '
      }
      return className + 'bg-error text-white hover:bg-error-dark hover:border-error-dark'
    }

    default:
      return 'focus-visible:ring-primary/30'
  }
})

const btnSize = computed<{ base: string; icon: string }>(() => {
  if (props.link) return { base: 'text-base rounded-sm p-1', icon: 'w-5 h-5' }

  switch (props.size) {
    case 'sm':
      return {
        base: 'min-h-10 md:min-h-11 text-sm rounded-lg px-3 py-2',
        icon: 'w-5 h-5'
      }
    case 'md':
      return {
        base: 'min-h-12 md:min-h-14 text-base rounded-1.5xl px-4 py-3',
        icon: 'w-6 h-6'
      }
    case 'lg':
      return {
        base: 'min-h-12 md:min-h-14 text-lg rounded-1.5xl px-6 py-4',
        icon: 'w-7 h-7'
      }
    default:
      return { base: '', icon: '' }
  }
})

const disableButton = computed(() => {
  return props.disabled || props.loading
})

const clickable = computed(() => {
  return (props.type === 'button' || !!props.href) && !disableButton.value
})
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :aria-current="exactActive ? 'page' : undefined"
    :class="{
      [btnVariant]: true,
      [btnSize.base]: true,
      'cursor-not-allowed opacity-70': disableButton,
      'justify-center text-center': centered
    }"
    :disabled="disableButton || undefined"
    :href="href"
    :type="href ? undefined : type"
    class="inline-flex select-none items-center whitespace-nowrap font-semibold transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring"
    v-on="clickable ? { click: (e: Event) => $emit('click', e) } : {}"
  >
    <template v-if="loading">
      <BaseIcon
        :class="btnSize.icon"
        class="animate-spin"
        name="cameraOutline"
        viewBox="0 0 20 20"
      />
      <span class="sr-only">Loading...</span>
    </template>
    <template v-else>
      <BaseIcon
        v-if="icon && (!isDefined(icon.position) || icon.position === 'left')"
        :class="[icon.className || btnSize.icon, { 'mr-1.5': hasDefaultSlot }]"
        :name="icon.name"
        :view-box="icon.viewBox"
      />
      <slot v-if="hasDefaultSlot" />
      <BaseIcon
        v-if="icon && icon.position === 'right'"
        :class="[btnSize.icon, icon.className, { 'ml-1.5': hasDefaultSlot }]"
        :name="icon.name"
        :view-box="icon.viewBox"
      />
    </template>
  </component>
</template>
