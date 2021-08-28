import CookieComply from './components/CookieComply.vue'

export default {
  install: (app, options) => {
    if (!window) return;

    app.component('vue-cookie-comply', CookieComply)
  }
}
