<template>
  <div class="cookie-comply__modal">
    <div class="cookie-comply__modal-middle">
      <div class="cookie-comply__modal-inner">
        <img
          alt="Back arrow"
          src="../assets/arrow_back.svg"
          class="cookie-comply__back-arrow"
          @click="onCloseModal"
        />

        <header class="cookie-comply__modal-header">
          <slot name="modal-header">
            <h3>Your privacy preferences</h3>
          </slot>
        </header>

        <main class="cookie-comply__modal-content">
          <div v-for="(preference, index) in preferences" :key="index">
            <slot name="modal-body" :preference="preference" :index="index">
              <h2>{{ preference.title }}</h2>
              <p>{{ preference.description }}</p>
              <div
                v-for="item in preference.items"
                :key="item.value"
                class="cookie-comply__modal-switches"
              >
                <h3>{{ item.label }}</h3>
                <cookie-comply-switch
                  :value="item.value"
                  :is-required="item.isRequired"
                  @update:checkbox="handleCheckboxUpdate"
                />
              </div>
            </slot>
          </div>
        </main>

        <footer class="cookie-comply__modal-footer">
          <slot name="modal-footer">
            <cookie-comply-button @handleClick="onSaveConfiguration">
              Save
            </cookie-comply-button>
          </slot>
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
    CookieComplySwitch,
  },
  props: {
    preferences: { type: Array, default: () => [] },
  },
  emits: ['cookie-comply-save', 'cookie-comply-close'],
  data() {
    return {
      checkedValues: [],
    };
  },
  methods: {
    handleCheckboxUpdate({ value, isEnable }) {
      isEnable
        ? this.checkedValues.push(value)
        : this.checkedValues.splice(this.checkedValues.indexOf(value), 1);
    },
    onSaveConfiguration() {
      this.$emit('cookie-comply-save', this.checkedValues);
    },
    onCloseModal() {
      this.$emit('cookie-comply-close');
    },
  },
};
</script>

<style>
.cookie-comply__modal {
  display: table;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: var(--background-overlay);
}

.cookie-comply__modal-middle {
  display: table-cell;
  vertical-align: middle;
}

.cookie-comply__modal-inner {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: 400px;
  padding: var(--spacing-lg);
  background-color: var(--color-white);
  border-radius: var(--spacing-sm);
  box-shadow: var(--box-shadow);
}

.cookie-comply__back-arrow {
  position: absolute;
  left: var(--spacing-lg);
  cursor: pointer;
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
  border-bottom: var(--border-color-lightest);
}

@media only screen and (max-width: 380px) {
  .cookie-comply__modal-middle {
    padding: var(--spacing-md);
  }

  .cookie-comply__modal-inner {
    width: auto;
  }
}

.cookie-comply__modal-header {
  border-bottom: var(--border-color-light);
}

.cookie-comply__modal-footer {
  border-top: var(--border-color-light);
  padding-top: var(--spacing-lg);
}
</style>
