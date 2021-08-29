# Vue Cookie Comply 🍪

[//]: # (Insert on Made with vue!)

> A Vue 3 compatible component to handle cookie consent

## Features

- 🔹 Small bundle size (2.2kb minified + gziped)
- 🙅‍♂️ No external depedencies
- 🤖 Opinated and customizable data structure for the modal content
- 👐 Emit events on user actions so you can use your handlers
- 📱 Default responsive layout
- 🗄️ Highly customizable through **slots**
- 🚪 Usage of Vue 3 **Teleport** to render the modal anywhere in your app
- 💅 Write your own CSS or use the default styles

> Heavily inspired by Airbnb's cookie consent UI
## Demo

Check out a demo page using Vue 3, Vite and vue-cookie-comply: [DEMO PAGE](https://heuristic-shockley-30a885.netlify.app/)

## Installation

> This package is only compatible with Vue 3.x

First install `vue-cookie-comply` as a dependency of your Vue app:

```sh
yarn add vue-cookie-comply

# or

npm install vue-cookie-comply
```

Then, install `vue-cookie-comply` as a plugin wherever you create your Vue app:

```js
import { createApp } from 'vue'
import App from './App.vue'
import VueCookieComply from 'vue-cookie-comply'
import 'vue-cookie-comply/dist/style.css'

const app = createApp(App)

app.use(VueCookieComply)
app.mount('#app')
```

**Don't forget to import the `css` file if you want to leverage the default style** 😉

## Usage

Now you're ready to use the component `<vue-cookie-comply />` it in your app:

```vue
<template>
  <main>
    <header />

    <div />

      <vue-cookie-comply
        :preferences="preferences"
        @on-accept-all-cookies="onAccept"
        @on-save-cookie-preferences="onSavePreferences"
      />

    <footer />
  </main>
</template>
```

> `vue-cookie-comply` automatically places the component at the bottom of your page

## Props

### Preferences

An array of objects to display the options of cookie preferences **in the modal**. The user may or may not be able to interact with a preference option (see `isRequired` field):

```js
[
  {
    title: 'Performance',
    description:
      'Bla bla serviços que podemos oferecer erviços que podemos oferecer erviços que podemos oferecer erviços que podemos oferecer serviços que podemos oferecer.',
    items: [{ label: 'Active', value: 'performance', isRequired: true }],
  },
  {
    title: 'Analytics',
    description:
      'Bla bla serviços que podemos oferecer erviços que podemos oferecer erviços que podemos oferecer erviços que podemos oferecer serviços que podemos oferecer.',
    items: [
      { label: 'GoogleAnalytics', value: 'ga' },
      { label: 'Sentry', value: 'sentry' },
      { label: 'Mapbox', value: 'mapbox' },
      { label: 'New Relic', value: 'newRelic' },
      { label: 'Dog Food', value: 'dogfood' },
    ],
  },
];
```

Each object is a section of the **preference's modal**. Each section consists of the following values:

- title: the cookie preference name to be displayed

- description: the cookie preference description to be displayed along with the title

- items: array of objects displaying the preference's options the user may interact with
  - label: name of the option
  - value: value to be dispatched once the user select this option
  - isRequired: if `true`, means the preference is obligatory and such cookies _cannot be opted out_


### on-accept-all-cookies

This event is dispatched when the user clicks the `Accept All` button. You can call your own handler to do whatever you might do in this case:

```vue
<template>
  <vue-cookie-comply
    :preferences="preferences"
    @on-accept-all-cookies="onAccept"
  />
</template>

<script>
  export default {
    methods: {
      onAccept() {
        console.log('User has accepted all cookies')
      }
    }
  }
</script>
```

After `on-accept-all-cookies` is dispatched, a item with key `cookie-comply` is placed in the `localStorage`, with the value `all`. You can use the presence of this key and value to do some logic on the client. Once the `cookie-comply` key exists in the `localStorage`, the `vue-cookie-comply` won't show anymore in the page.

### on-save-cookie-preferences

This event is dispatched when the user open the modal and saves their preferences. The handler will receive an Array containing the `values` of preferences the user opted in:

```vue
<template>
  <vue-cookie-comply
    :preferences="preferences"
    @on-save-cookie-preferences="onSavePreferences"
  />
</template>

<script>
  export default {
    methods: {
      onSavePreferences(preferences) {
        console.log(preferences) // ['performance', 'ga', 'newRelic']
      }
    }
  }
</script>
```

After `on-save-cookie-preferences` is dispatched, a item with key `cookie-comply` is placed in the `localStorage`, with the value of an array containing the values the user opted in, eg. `['performance', 'ga', 'newRelic']`. You can use the presence of this key and value to do some logic on the client. Once the `cookie-comply` key exists in the `localStorage`, the `vue-cookie-comply` won't show anymore in the page.

## Composition

You can use slots to leverage composition and customize `vue-cookie-comply` with your own components. If the slots are not used, it will default to the internal components.

```vue
<vue-cookie-comply
  :preferences="preferences"
  @on-accept-all-cookies="onAcceptAll"
  @on-save-cookie-preferences="onSavePreferences"
>
    <template v-slot:header>
      <header>Custom header</header>
    </template>

    <template v-slot:modal-header>
      <h3>My custom modal header</h3>
    </template>

    <template v-slot:modal-body="{ preference, index }">
      <div>{{ preference.title }}</div>
    </template>

    <template v-slot:modal-footer>
      <footer>
        My custom modal footer
      </footer>
    </template>
  </vue-cookie-comply>
```

There are 4 slots to be customized: `v-slot:header`, `v-slot:modal-header`, `v-slot:modal-body`, `v-slot:modal-footer`. 

Note that `v-slot:modal-body` is a [scoped slot](https://v3.vuejs.org/guide/component-slots.html#scoped-slots) so you can have access to the preference's values 🤩.

## Tricks

Since the modal it's using the [Vue Teleport](https://v3.vuejs.org/guide/teleport.html) feature and it targets the `<body>` tag by default, if you have any global styles make sure they are applied to the body, so the modal can inherit styles such as font-family, color, etc..

```css
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
```

## Contributing

Feel free to open an issue with bugs, suggestions for features, enhancements, weird behaviours, questions and more. Also, feel more than welcome to open an PR to fix something you came across or improve the code 🚀
