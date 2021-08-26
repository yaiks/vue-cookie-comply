<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" />
  <vue-cookie-comply
    :preferences="preferences"
    @on-accept-all-cookies="onAcceptAll"
    @on-save-cookie-preferences="onSavePreferences"
  >
    <template v-slot:modal-header>
      <h3>My custom header</h3>
    </template>
  </vue-cookie-comply>
</template>

<script setup>
import { onMounted } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

onMounted(() => {
  document.cookie = 'username=John Doe';
})

const onSavePreferences = (info) => {
  console.log('in my app doing something with info -> ', info)
}

const onAcceptAll = () => {
  console.log('accepted all cookies')
}

const preferences = [
  {
    title: 'Desempenho',
    description: 'Bla bla serviços que podemos oferecer erviços que podemos oferecer erviços que podemos oferecer erviços que podemos oferecer serviços que podemos oferecer.',
    items: [
      { label: 'Ativar', value: 'desempenho' }
    ]
  },
  {
    title: 'Analytics',
    description: 'Bla bla serviços que podemos oferecer erviços que podemos oferecer erviços que podemos oferecer erviços que podemos oferecer serviços que podemos oferecer.',
    items: [
      { label: 'GoogleAnalytics', value: 'ga' },
      { label: 'Sentry', value: 'sentry' },
      { label: 'Mapbox', value: 'mapbox' },
      { label: 'New Relic', value: 'newRelic' },
      { label: 'Dog Food', value: 'dogfood' }
    ]
  },
]

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
