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
      :checked="isRequired || isDefaultEnable"
      @input="onToggle($event.target.value)"
    />
    <span
      class="cookie-comply-slider cookie-comply-round"
      :class="{ 'cookie-comply-required': isRequired }"
    ></span>
  </label>
</template>

<script>
export default {
  name: 'CookieComplySwitch',
  props: {
    value: { type: String, required: true },
    isRequired: { type: Boolean, default: false },
    isDefaultEnable: { type: Boolean, default: false },
  },
  emits: ['update:checkbox'],
  data() {
    return {
      isEnable: false,
    };
  },
  mounted() {
    if (this.isRequired || this.isDefaultEnable) {
      this.isEnable = true;
      this.$emit('update:checkbox', { value: this.value, isEnable: true });
    }
  },
  methods: {
    onToggle(value) {
      this.isEnable = !this.isEnable;
      this.$emit('update:checkbox', { value, isEnable: this.isEnable });
    },
  },
};
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
</style>
