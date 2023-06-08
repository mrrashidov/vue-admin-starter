## BaseButton Component

### This component accepts these props:

```ts
import type { ButtonVariant, Icon } from '@/shared/components/BaseIcon/types'

interface BaseButtonProps {
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
}
```

##### Default props:

- type = 'button'
- variant = 'primary'
- size = 'md'
- hasDefaultSlot = true
- centered = true

### Examples

```vue
<BaseButton>Button</BaseButton>
<BaseButton variant="error" outlined>Button outlined</BaseButton>
<BaseButton
  size="lg"
  variant="error"
  :icon="{ name: 'filter', position: 'left', className: 'text-red' }"
>
  Button with icon
</BaseButton>
<BaseButton size="lg" link>Button link</BaseButton>
<BaseButton variant="error" @click="handleTestAction">Button with action</BaseButton>
<BaseButton :loading="isLoading">Button with loading</BaseButton>
<BaseButton variant="error" disabled>Button</BaseButton>
```

### Adding new variants

1. First you need to add the **new variant** name to the `variant` prop in the `BaseButton.vue` component
2. Then you need to add the **new variant** styles to the `btnVariant` computed property in the `BaseButton.vue` component
3. DONE! Now you can use the new variant.
