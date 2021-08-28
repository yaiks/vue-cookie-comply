import CookieComply from './components/CookieComply.vue';

export default {
  install: (app) => {
    if (!window) return;

    app.component('VueCookieComply', CookieComply);
  },
};
