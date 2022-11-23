<template>
  <label
    class="cookie-comply-switch"
    :title="isRequired ? `is required` : value"
  >
    <input
      :id="value"
      type="checkbox"
      :value="value"
      :disabled="isRequired"
      :checked="isRequired || isDefaultEnable || isChecked"
      @input="onToggle($event.target.value)"
    />
    <span
      class="cookie-comply-slider cookie-comply-round"
      :class="{ 'cookie-comply-required': isRequired }"
    ></span>
  </label>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref } from "vue";
interface Props {
  value: string
  isRequired?: boolean
  isDefaultEnable?: boolean
  isChecked?: boolean
}

interface Emits {
  (e: 'update:checkbox', payload: {value: string; isEnable: boolean}): void
}

const props = withDefaults(defineProps<Props>(), {
  isRequired: false,
  isDefaultEnable: false,
  isChecked: false
})

const emit = defineEmits<Emits>()

const isEnable = ref(false)

onMounted((): void => {
  if (props.isRequired || props.isDefaultEnable || props.isChecked) {
    isEnable.value = true;
    emit('update:checkbox', { value: props.value, isEnable: true });
  }
})

const onToggle = (value: string): void => {
  isEnable.value = !isEnable.value;
  emit('update:checkbox', { value, isEnable: isEnable.value });
}
</script>

<style>
.cookie-comply-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.cookie-comply-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.cookie-comply-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.cookie-comply-slider:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: var(--color-white);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .cookie-comply-slider {
  background-color: var(--color-green);
}

input:focus + .cookie-comply-slider {
  box-shadow: 0 0 1px var(--color-green);
}

input:checked + .cookie-comply-slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.cookie-comply-slider.cookie-comply-round {
  border-radius: 34px;
}

.cookie-comply-slider.cookie-comply-round:before {
  border-radius: 50%;
}

.cookie-comply-required {
  cursor: not-allowed;
}

input:checked + .cookie-comply-required.cookie-comply-slider {
  background-color: #ccc;
}
</style>
