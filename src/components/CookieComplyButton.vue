<template>
  <button class="cookie-comply__button" :class="className" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import {defineProps} from 'vue'
interface Props {
  className?: string
}

interface Emits {
  (e: 'handleClick'): void
}

const props = withDefaults(defineProps<Props>(), {
  className: ''
})

const emit = defineEmits<Emits>()

const handleClick = (): void => {
  emit('handleClick')
}
</script>

<style>
.cookie-comply__button {
  padding: 12px 32px;
  border: 1px solid #333;
  background-color: var(--color-white);
  font-weight: 600;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
}

.cookie-comply__edit-button {
  padding: 8px;
  border: 1px solid var(--color-green);
  background-color: var(--color-green);
  border-radius: 50%;
  box-shadow: var(--box-shadow);
}
</style>
