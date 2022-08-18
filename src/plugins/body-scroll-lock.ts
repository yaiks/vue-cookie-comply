import { enableBodyScroll, disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'

export default {
  install: ( app, options ) => {
    app.directive('scroll-lock', {
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
    })
  },
}
