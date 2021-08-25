import { createApp } from 'vue'
import App from './App.vue'
import vueCookieComply from './plugins/vue-cookie-comply'

const app = createApp(App)

app.use(vueCookieComply)
app.mount('#app')
