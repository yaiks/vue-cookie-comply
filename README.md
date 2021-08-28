# Vue Cookie Comply

A Vue component that helps you handle cookie preferences and acceptance

Insert demo page here!

> Compatible with Vue 3

## Features

- Usage of Vue 3 **Teleport** to render the modal anywhere in your app
- Opinated and customizable data structure for the modal content
- Emit events on user actions, so you can do whatever you want
- Default responsive layout
- Heavy usage of **slots** so you can compose your own components
- Provides default CSS styles but you can customize it with your own styles as well

## How to use

Pass an array of objects to display in the modal

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

## Usage

```vue
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
```

```js
const onSavePreferences = (info) => {
  console.log('in my app doing something with info -> ', info);
};

const onAcceptAll = () => {
  console.log('accepted all cookies');
};
```

Teleport target is `body` by default. If you want to change ir, pass the following prop.

> Just make sure your global styles are applied to body, so the modal can inherit styles like font-family, color, etc..

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
