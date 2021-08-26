<template>
  <label class="switch">
    <input type="checkbox" :id="value" :value="value" @input="onToggle($event.target.value)" />
    <span class="slider round"></span>
  </label>
</template>

<script>
export default {
  name: 'CookieComplySwitch',
  emits: ['update:checkbox'],
  props: {
    value: { type: String, required: true },
  },
  data() {
    return {
      isEnable: false,
    }
  },
  methods: {
    onToggle(value) {
      this.isEnable = !this.isEnable;
      this.$emit('update:checkbox', { value, isEnable: this.isEnable })
    }
  }
}
</script>

<style>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #00c58e;
}

input:focus + .slider {
  box-shadow: 0 0 1px #00c58e;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

</style>