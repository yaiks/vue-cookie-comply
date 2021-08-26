<template>
  <div class="cookie-comply__modal">
    <div class="cookie-comply__modal-middle">
      <div class="cookie-comply__modal-inner">
        <header class="cookie-comply__modal-header">
          <slot name="modal-header">
            <h3>Sua privacidade</h3>
          </slot>
        </header>

        <main class="cookie-comply__modal-content">
          <slot>
            <div v-for="(preference, index) in preferences" :key="index">
              <h2>{{ preference.title }}</h2>
              <p>{{ preference.description }}</p>
              <div v-for="item in preference.items" :key="item.value" class="cookie-comply__modal-switches">
                <h3>{{ item.label }}</h3>
                <cookie-comply-switch :value="item.value" @update:checkbox="handleCheckboxUpdate" />
              </div>
            </div>
          </slot>
        </main>

        <footer class="cookie-comply__modal-footer">
          <cookie-comply-button @handleClick="onSaveConfiguration">Salvar</cookie-comply-button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import CookieComplyButton from './CookieComplyButton.vue';
import CookieComplySwitch from './CookieComplySwitch.vue';

export default {
  name: 'CookieComplyModal',
  components: {
    CookieComplyButton,
    CookieComplySwitch
  },
  props: {
    preferences: { type: Array, default: [] }
  },
  data() {
    return {
      checkedValues: []
    }
  },
  methods: {
    handleCheckboxUpdate({ value, isEnable }) {
      console.log("isEnable", isEnable)
      isEnable ? this.checkedValues.push(value) : this.checkedValues.splice(this.checkedValues.indexOf(value), 1);
    },
    onSaveConfiguration() {
      this.$emit('cookie-comply-save', this.checkedValues);
    }
  }
}
</script>

<style>
.cookie-comply__modal {
  display: table;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(34, 34, 34, 0.3);
}

.cookie-comply__modal-middle {
  display: table-cell;
  vertical-align: middle;
}

.cookie-comply__modal-inner {
  margin-left: auto;
  margin-right: auto;
  width: 400px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 6px 1px rgb(0 0 0 / 10%), 0 1px 7px 1px rgb(0 0 0 / 6%);
}

.cookie-comply__modal-content {
  overflow-y: scroll;
  max-height: 400px;
  text-align: left;
}

.cookie-comply__modal-switches {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media only screen and (max-width: 380px) {
  .cookie-comply__modal-middle {
    padding: 14px;
  }

  .cookie-comply__modal-inner {
    width: auto;
  }
}

.cookie-comply__modal-header {
  border-bottom: 1px solid rgba(0, 0, 0, .1);
}

.cookie-comply__modal-footer {
  border-top: 1px solid rgba(0, 0, 0, .1);
  padding-top: 20px;
}
</style>