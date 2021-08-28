import CookieComply from './components/CookieComply.vue'

export default {
  install: (app, options) => {
    if (!window) return;

    // get cookies
    const cookies = document.cookie;

    // receive message

    // expose function when accepted all cookies
    // receive array with objects
    /**
     * [
     *  { id, title, description, required }
     * ]
     */
    // expose function to handler custom settings: handler(options)

    app.component('vue-cookie-comply', CookieComply)
  }
}