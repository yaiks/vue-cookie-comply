import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const scrollLock = {
  // On mount (inserted)
  mounted(el, binding) {
    if (binding.value) {
      disableBodyScroll(el);
    }
  },

  updated(el, binding) {
    if (binding.value) {
      disableBodyScroll(el);
    } else {
      enableBodyScroll(el);
    }
  },

  // On unmount (removed)
  unmounted(el) {
    enableBodyScroll(el);
  },
};

export { scrollLock };
