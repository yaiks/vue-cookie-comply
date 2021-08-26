<template>
  <aside class="cookie-comply">
    <div class="cookie-comply__header">
      <slot name="header">
        <h3 class="cookie-comply__header-title">Cookie settings</h3>
        <p class="cookie-comply__header-description">{{ this.description }}</p>
      </slot>
    </div>

    <div class="cookie-comply__actions">
      <cookie-comply-button @handleClick="openPreferences">
        Preferências
      </cookie-comply-button>
      <cookie-comply-button
        className="cookie-comply__button-accept"
        @handleClick="handleAcceptAll"
      >
        Accept All
      </cookie-comply-button>
    </div>

    <Teleport to="#app">
      <cookie-comply-modal v-if="isOpen" :preferences="preferences" @cookie-comply-save="onSave">
        <template v-slot:modal-header>
          <slot name="modal-header"></slot>
        </template>
      </cookie-comply-modal>
    </Teleport>
  </aside>
</template>

<script>
import CookieComplyModal from "./CookieComplyModal.vue";
import CookieComplyButton from "./CookieComplyButton.vue";

export default {
  name: "CookieComply",
  components: { CookieComplyModal, CookieComplyButton },
  props: {
    preferences: { type: Array, default: [] }
  },
  data() {
    return {
      description:
        "Usamos cookies e tecnologias semelhantes para ajudar a personalizar conteúdos, adaptar e avaliar anúncios e oferecer uma experiência melhor. Ao clicar em OK ou ativar uma opção em Preferências de cookies.",
      isOpen: false,
    };
  },
  mounted() {
    console.log("CookieComply!!");
  },
  methods: {
    handleAcceptAll() {
      this.$emit("on-accept-all-cookies");
    },
    openPreferences() {
      this.isOpen = true;
    },
    onSave(data) {
      this.isOpen = false;
      this.$emit('on-save-cookie-preferences', Object.assign({}, data))
    },
  },
};
</script>

<style>
.cookie-comply {
  position: absolute;
  bottom: 8px;
  left: 8px;
  right: 8px;
  background-color: white;
  box-shadow: 0 1px 6px 1px rgb(0 0 0 / 10%), 0 1px 7px 1px rgb(0 0 0 / 6%);
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr minmax(35%, 40%);
  padding: 16px;
  border-radius: 8px;
}

@media only screen and (max-width: 1024px) {
  .cookie-comply {
    grid-template-columns: none;
  }
}

.cookie-comply__header {
  justify-self: flex-start;
  text-align: initial;
}

.cookie-comply__header-title,
.cookie-comply__header-description {
  margin: 0;
}
.cookie-comply__header-title {
  margin-bottom: 6px;
}
.cookie-comply__header-description {
  line-height: 20px;
}

.cookie-comply__actions {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(2, 1fr);
  align-self: center;
}

@media only screen and (max-width: 380px) {
  .cookie-comply__header {
    margin-bottom: 8px;
  }

  .cookie-comply__actions {
    grid-template-columns: auto;
  }
}

.cookie-comply__button-accept {
  background-color: #00c58e;
  color: white;
  border: none;
}
</style>
