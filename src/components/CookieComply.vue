<template>
  <aside class="cookie-comply">
    <div class="cookie-comply__header">
      <slot name="header">
        <h3 class="cookie-comply__header-title">Cookie settings</h3>
        <p class="cookie-comply__header-description">{{ this.description }}</p>
      </slot>
    </div>

    <div class="cookie-comply__actions">
      <button class="cookie-comply__button" @click="openPreferences">Preferências</button>
      <button class="cookie-comply__button cookie-comply__button-accept" @click="handleAcceptAll">Accept All</button>
    </div>

    <Teleport to="#app">
      <cookie-comply-modal v-if="isOpen" @close-modal="onCloseModal">

      </cookie-comply-modal>
    </Teleport>
  </aside>
</template>

<script>
import CookieComplyModal from './CookieComplyModal.vue';

export default {
  components: { CookieComplyModal },
  name: 'CookieComply',
  props: {
  },
  data() {
    return {
      description: 'Usamos cookies e tecnologias semelhantes para ajudar a personalizar conteúdos, adaptar e avaliar anúncios e oferecer uma experiência melhor. Ao clicar em OK ou ativar uma opção em Preferências de cookies, você concorda com isso',
      isOpen: false,
    }
  },
  mounted() {
    console.log('CookieComply!!')
  },
  methods: {
    handleAcceptAll() {
      this.$emit('handleAcceptAll')
    },
    openPreferences() {
      this.isOpen = true;
    },
    onCloseModal() {
      this.isOpen = false;
    }
  }
}
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

.cookie-comply__button {
  padding: 12px 32px;
  border: 1px solid #333;
  background-color: white;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
}

.cookie-comply__button-accept {
  background-color: #00c58e;
  color: white;
  border: none;
}
</style>