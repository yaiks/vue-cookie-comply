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

<script setup lang="ts">
import { defineProps, onMounted, ref, defineExpose } from "vue";
import { getConsentValuesFromStorage } from '../shared/storageUtils';
import CookieComplyModal from './CookieComplyModal.vue';
import CookieComplyButton from './CookieComplyButton.vue';
import { scrollLock as vScrollLock } from '../directives/scroll-lock';

interface Props {
  headerTitle?: string
  headerDescription?: string
  preferencesLabel?: string
  acceptAllLabel?: string
  rejectAllLabel?: string
  preferences: Array<unknown>
  target?: string
  greyOutBody?: boolean
  showAcceptAllInModal?: boolean
  showEditButton?: boolean
  editCookieIconPath?: string
}

interface Emits {
  (e: 'on-accept-all-cookies'): void
  (e: 'on-save-cookie-preferences', payload: Array<unknown>): void
  (e: 'on-reject-all-cookies'): void
  (e: 'on-cookie-comply-mount'): void
  (e: 'on-cookie-comply-mount', payload: Array<string> | string): void
}

const props = withDefaults(defineProps<Props>(), {
  headerTitle: 'Cookie Settings',
  headerDescription: 'We use cookies and similar technologies to help personalize content and offer a better experience. You can opt to customize them by clicking the preferences button.',
  preferencesLabel: 'Preferences',
  acceptAllLabel: 'Accept All',
  rejectAllLabel: 'Reject All',
  preferences: () => ([]),
  target: 'body',
  greyOutBody: false,
  showAcceptAllInModal: false,
  showEditButton: false,
  editCookieIconPath: '~@/../src/assets/cookie_edit.svg'
})

const emit = defineEmits<Emits>()

const showCookieComply = ref(true)
const isModalOpen = ref(false)

onMounted((): void => {
  if (localStorage.getItem('cookie-comply')) {
    showCookieComply.value = false;
  }
  emit('on-cookie-comply-mount', getConsentValuesFromStorage());
})

const handleAcceptAll = (): void => {
  showCookieComply.value = false;
  localStorage.setItem('cookie-comply', 'all');
  emit('on-accept-all-cookies');
}
const handleRejectAll = (): void => {
  showCookieComply.value = false;
  localStorage.setItem('cookie-comply', '[]');
  emit('on-reject-all-cookies');
}
const openPreferences = (): void => {
  isModalOpen.value = true;
}
const onSave = (data: Array<string>): void => {
  isModalOpen.value = false;
  showCookieComply.value = false;

  // transform Proxy into array of selected preferences
  const preferencesArray = Object.values(data);

  localStorage.setItem('cookie-comply', JSON.stringify(preferencesArray));
  emit('on-save-cookie-preferences', preferencesArray);
}
const openCookieComply = (): void => {
  showCookieComply.value = true
}
const getAcceptedServices = (): Array<string> => {
  return getConsentValuesFromStorage()
}

defineExpose({openCookieComply, getAcceptedServices})
</script>

<style lang="css">
@import '../styles/variables.css';

/* Render cookie comply out of viewport to reduce LCP */
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.8;
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

.cookie-comply-body-grey-out {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000;
  opacity: 0;
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
  animation: slide-up 1s forwards;
  transform: translateY(110vh);
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
