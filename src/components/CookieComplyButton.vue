<template>
  <button class="cookie-comply__button" :class="className" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'CookieComplyButton',
  props: {
    className: { type: String, required: false, default: '' },
  },
  emits: ['handleClick'],
  methods: {
    handleClick() {
      this.$emit('handleClick');
    },
  },
};
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
</style>
