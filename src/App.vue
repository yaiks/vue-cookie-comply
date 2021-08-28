<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" />
  <vue-cookie-comply
    :preferences="preferences"
    @on-accept-all-cookies="onAcceptAll"
    @on-save-cookie-preferences="onSavePreferences"
  >
    <template v-slot:modal-header>
      <h3>My custom modal header</h3>
    </template>

    <!-- <template v-slot:modal-body="{ preference, index }">
      <div>{{ preference.title }}</div>
      <div>{{ index }}</div>
    </template> -->
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
    title: 'Performance',
    description: 'Bla bla serviços que podemos oferecer erviços que podemos oferecer erviços que podemos oferecer erviços que podemos oferecer serviços que podemos oferecer.',
    items: [
      { label: 'Active', value: 'performance', isRequired: true }
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
