<template>
  <div
    v-if="greyOutBody && showCookieComply"
    class="cookie-comply-body-grey-out"
  />
  <aside
    v-if="showCookieComply"
    v-scroll-lock="showCookieComply"
    class="cookie-comply"
    :class="{ 'cookie-comply--modal-open': isModalOpen }"
  >
    <div class="cookie-comply__header">
      <slot name="header">
        <h3 class="cookie-comply__header-title">{{ headerTitle }}</h3>
        <p
          class="cookie-comply__header-description"
          v-html="headerDescription"
        />
      </slot>
    </div>

    <div class="cookie-comply__actions">
      <cookie-comply-button @handle-click="handleRejectAll">
        {{ rejectAllLabel }}
      </cookie-comply-button>
      <cookie-comply-button @handle-click="openPreferences">
        {{ preferencesLabel }}
      </cookie-comply-button>
      <cookie-comply-button
        class-name="cookie-comply__button-accept"
        @handle-click="handleAcceptAll"
      >
        {{ acceptAllLabel }}
      </cookie-comply-button>
    </div>

    <Teleport :to="target">
      <cookie-comply-modal
        v-if="isModalOpen"
        :preferences="preferences"
        :show-accept-all-in-modal="showAcceptAllInModal"
        @cookie-comply-save="onSave"
        @cookie-comply-accept-all="handleAcceptAll"
        @cookie-comply-close="isModalOpen = false"
      >
        <template #modal-header>
          <slot name="modal-header"></slot>
        </template>

        <template #modal-body="{ preference, index }">
          <slot
            name="modal-body"
            :preference="preference"
            :index="index"
          ></slot>
        </template>

        <template #modal-footer>
          <slot name="modal-footer"></slot>
        </template>
      </cookie-comply-modal>
    </Teleport>
  </aside>
  <aside
    v-if="showEditButton && !showCookieComply"
    class="cookie-comply-edit"
  >
    <cookie-comply-button
      class-name="cookie-comply__edit-button"
      @handle-click="openPreferences"
    >
      <img :src="editCookieIconPath" alt="edit cookies">
    </cookie-comply-button>

    <Teleport :to="target">
      <cookie-comply-modal
        v-if="isModalOpen"
        :preferences="preferences"
        :show-accept-all-in-modal="showAcceptAllInModal"
        @cookie-comply-save="onSave"
        @cookie-comply-accept-all="handleAcceptAll"
        @cookie-comply-close="isModalOpen = false"
      >
        <template #modal-header>
          <slot name="modal-header"></slot>
        </template>

        <template #modal-body="{ preference, index }">
          <slot
            name="modal-body"
            :preference="preference"
            :index="index"
          ></slot>
        </template>

        <template #modal-footer>
          <slot name="modal-footer"></slot>
        </template>
      </cookie-comply-modal>
    </Teleport>
  </aside>
</template>

<script>
import CookieComplyModal from './CookieComplyModal.vue';
import CookieComplyButton from './CookieComplyButton.vue';
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

const scrollLock = {
  // On mount (inserted)
  mounted( el, binding ) {
    if (binding.value) {
      disableBodyScroll(el)
    }
  },

  updated( el, binding ) {
    if (binding.value) {
      disableBodyScroll(el)
    } else {
      enableBodyScroll(el)
    }
  },

  // On unmount (removed)
  unmounted( el ) {
    enableBodyScroll(el)
  }
}

export default {
  name: 'CookieComply',
  components: { CookieComplyModal, CookieComplyButton },
  directives: {
    'scroll-lock': scrollLock
  },
  props: {
    headerTitle: { type: String, default: 'Cookie settings' },
    headerDescription: {
      type: String,
      default:
        'We use cookies and similar technologies to help personalize content and offer a better experience. You can opt to customize them by clicking the preferences button.',
    },
    preferencesLabel: { type: String, default: 'Preferences' },
    acceptAllLabel: { type: String, default: 'Accept All' },
    rejectAllLabel: { type: String, default: 'Reject All' },
    preferences: { type: Array, default: () => [] },
    target: { type: String, default: 'body' },
    greyOutBody: { type: Boolean, default: false },
    showAcceptAllInModal: { type: Boolean, default: false },
    showEditButton: {
      type: Boolean,
      default: false
    },
    editCookieIconPath: {
      type: String,
      default: '~@/../src/assets/cookie_edit.svg'
    }
  },
  emits: [
    'on-accept-all-cookies',
    'on-save-cookie-preferences',
    'on-reject-all-cookies',
  ],
  data() {
    return {
      showCookieComply: true,
      isModalOpen: false,
    };
  },
  mounted() {
    if (localStorage.getItem('cookie-comply')) {
      this.showCookieComply = false;
    }
    this.removeOutOfViewportClass()
  },
  methods: {
    removeOutOfViewportClass() {
      this.$nextTick(() => {
        const greyOutElement = this.$el.querySelector('.cookie-comply-body-grey-out');
        if (greyOutElement) {
          greyOutElement.classList.add('fade-in')
        }
        const cookieComply = this.$el.querySelector('.cookie-comply')
        if (cookieComply) {
          cookieComply.classList.add('slide-up')
        }
      })
    },
    handleAcceptAll() {
      this.showCookieComply = false;
      localStorage.setItem('cookie-comply', 'all');
      this.$emit('on-accept-all-cookies');
    },
    handleRejectAll() {
      this.showCookieComply = false;
      localStorage.setItem('cookie-comply', '[]');
      this.$emit('on-reject-all-cookies');
    },
    openPreferences() {
      this.isModalOpen = true;
    },
    onSave(data) {
      this.isModalOpen = false;
      this.showCookieComply = false;

      // transform Proxy into array of selected preferences
      const preferencesArray = Object.values(data);

      localStorage.setItem('cookie-comply', JSON.stringify(preferencesArray));
      this.$emit('on-save-cookie-preferences', preferencesArray);
    },
  },
};
</script>

<style>
@import '../styles/variables.css';

/* Render cookie comply out of viewport to reduce LCP */
@keyframes fade-in {
  0% {
    opacity(0);
  }
  100% {
    opacity(1);
  }
}
@keyframes slide-up {
  0% {
    transform: translateY(110vh);
  }
  100% {
    transform: translateY(0vh);
  }
}

.out-of-viewport {
  transform: translateY(110vh);
  animation: slide-up 1s forwards;
}

.cookie-comply-body-grey-out {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000;
  opacity: .8;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  animation: fade-in 1s forwards;
}

.cookie-comply {
  display: grid;
  grid-gap: var(--spacing-lg);
  grid-template-columns: 1fr minmax(35%, 40%);
  position: fixed;
  bottom: var(--spacing-sm);
  left: var(--spacing-sm);
  right: var(--spacing-sm);
  background-color: var(--color-white);
  box-shadow: var(--box-shadow);
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  transform: translateY(100%);
}

.cookie-comply-edit {
  position: fixed;
  bottom: var(--spacing-sm);
  left: var(--spacing-sm);
  right: var(--spacing-sm);
}

@media (max-width: 1024px) {
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
  margin-bottom: var(--spacing-sm);
}
.cookie-comply__header-description {
  line-height: 20px;
}

.cookie-comply__actions {
  display: grid;
  grid-gap: var(--spacing-lg);
  grid-template-columns: repeat(3, 1fr);
  align-self: center;
}

@media (max-width: 480px) {
  .cookie-comply__header {
    margin-bottom: var(--spacing-sm);
  }

  .cookie-comply__actions {
    grid-template-columns: auto;
  }
}

.cookie-comply__button-accept {
  background-color: var(--color-green);
  color: var(--color-white);
  border: none;
}
</style>
